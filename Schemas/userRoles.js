const mongoose = require('mongoose');

const userRoles = new mongoose.Schema({
    user_id: {
        type: String
    },
    role: {
        type: Boolean
    }
});

const UserRole = new mongoose.model('userRoles', userRoles);

module.exports = UserRole;