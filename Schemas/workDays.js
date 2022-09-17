const mongoose = require('mongoose');

const workDaysSchema = new mongoose.Schema({
    cashier_id: {
        type: String
    },
    start_time: {
        type: String
    },
    end_time: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

const WorkDay = new mongoose.model('workDay', workDaysSchema);

module.exports = WorkDay;