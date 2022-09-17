const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));

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

app.post('/register', (req, res) => {
    User.register({ username: req.body.username, email: req.body.email }, req.body.password,
        async (err, user) => {
            if (err) {
                res.json(`Error: ${err}`);
            }
            else {
                passport.authenticate('local')(req, res, () => {
                    res.json(req.user);
                });
            }
        }
    );
});

app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if (err) {
            return res.status(401).json(`Error: ${err}`);
        }
        else {
            passport.authenticate(`local`)(req, res, err => {
                if (!err) {
                    res.json(req.user);
                }
                else {
                    return res.json(`Error: ${err}`)
                }
            })
        }
    });
});

app.get('/:coffee', (req, res) => {
    menuModel.findById(req.params.coffee, async (item, err) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(item)
        }
    });
});

app.listen(3000, () => {
    console.log("Server has been started at port 3000")
});