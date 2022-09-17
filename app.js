const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');


const menuModel = require('./Schemas/checkList');
const User = require('./Schemas/userSchema');


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(session({
    secret: 'hackaton',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));



mongoose.connect("mongodb://127.0.0.1:27017/hackaton");



require('./routes/auth')(app)
require('./routes/cashier')(app)
require('./routes/getters')(app)



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