const mongoose = require('mongoose');
const passportLocal = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    }
});

userSchema.plugin(passportLocal);
const User = new mongoose.model('user', userSchema);

module.exports = User;