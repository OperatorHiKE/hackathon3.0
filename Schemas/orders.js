const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    time: {
        type: String
    },
    price: {
        type: String
    },
    product_id: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

const Order = new mongoose.model('order', ordersSchema);

module.exports = Order;