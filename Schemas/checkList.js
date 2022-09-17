const mongoose = require('mongoose');

const menu = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: Number,
    costPrice: Number,
    imageUrl: String,
    description: String
});

const menuModel = new mongoose.model('menu', menu);

module.exports = menuModel;