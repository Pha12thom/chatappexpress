const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        max_length: 50,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        max_length: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        max_length: 1024
    },

});


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;