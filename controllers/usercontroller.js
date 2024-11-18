const UserModel = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    });
}


const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await UserModel.findOne({ email });
        if (user) return res.status(400).json('User already exists');
        if (!email || !password || !name) return res.status(400).json('Please fill all fields');
        if (!validator.isEmail(email)) return res.status(400).json('Invalid email');
        if (!validator.isStrongPassword(password)) return res.status(400).json('Password is weak');
        user = new UserModel({
            name,
            email,
            password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const token = createToken(user._id);
        res.status(201).json({ token, user });
    } catch (err) {
        res.status(500).json(err);

    }
}

module.exports = { register };