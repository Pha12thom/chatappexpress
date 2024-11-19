const UserModel = require('../models/userModel');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const dotenv = require('dotenv');
const app = express();


app.use(express.json());


dotenv.config();

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    });
}

const register = async(req, res) => {
    console.log(req.body); // Log the body to see what's being received
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json('Please fill all fields');
    }

    let user = await UserModel.findOne({ email });
    if (user) return res.status(400).json('User already exists');
    if (!validator.isEmail(email)) return res.status(400).json('Invalid email');
    if (!validator.isStrongPassword(password)) return res.status(400).json('Password is weak');

    user = new UserModel({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const token = createToken(user._id);
    res.status(201).json({ token, user });
};



const login = async(req, res) => {
    const { email, password } = req.body;
    let user
    if (!email || !password) return res.status(400).json('Please fill all fields');
    if (!validator.isEmail(email)) return res.status(400).json('Invalid email');
    user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json('Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json('Invalid credentials');
    const token = createToken(user._id);
    res.status(200).json({ token, user });
}

const findUser = async(req, res) => {
    const userId = req.params.userId;
    try {
        const user = await UserModel.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }

}

module.exports = { register, login, findUser };