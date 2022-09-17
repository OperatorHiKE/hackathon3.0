const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({ extended: true }));
const menuModel = require('./Schemas/checkList');
const userModel = require('./Schemas/userSchema');

mongoose.connect("mongodb://127.0.0.1:27017/hackaton");

app.get('/', (req, res) => {
    menuModel.find({}, (item, err) => {
        if (!err) {
            res.json(item);
        }
        else {
            res.json(err)
        }
    });
});




app.listen(3000, () => {
    console.log("Server has been started at port 3000")
});