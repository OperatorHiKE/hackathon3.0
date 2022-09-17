const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));


const menuModel = require('./Schemas/checkList');
const User = require('./Schemas/userSchema');
const UserRole = require('./Schemas/userRoles');
const WorkDay = require('./Schemas/workDays');
const Order = require('./Schemas/orders');

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

app.get('/cashier', async (req, res) => {
    let user = await User.find({})
    let userRole = await UserRole.find({user_id: user._id})
    let role = userRole.role

    if (role) {
        let workDays = WorkDay.find({cashier_id: user._id})
    } else {
        res.redirect('/')
    }
})

app.post('/snap_workday', async (req, res) => {
    // If user is cashier
    //...
    let cashier_id = 0

    let workDay = await WorkDay.findOne({cashier_id: cashier_id})
    let date = new Date()
    date = date.getVarDate()
    if (workDay !== undefined) {
        WorkDay.updateOne({_id:workDay._id}, {
            $set: {
                "completed": true,
                "end_time": date
            }
        })
    }
    else {
        let date = new Date()
        workDay = new WorkDay()
        workDay.start_time = date
        workDay.completed = false
    }
})

app.post('/qr', async (req, res) => {
    let qr_hash = req.body.qr_hash
    let user = await User.findOne({_id:qr_hash})

    // process orders to rating
    let products = await menuModel.find({})
    for (let i = 0; i < products.length; i++) {
        let orders = await Order.find({user_id:qr_hash, product_id:products[i]._id})
        products[i] = {
            'count': orders.length,
            'product': products[i]
        }
    }
    user_preferences = products.sort((a, b) => { return a.count > b.count })

    let discounts = 0
    if (user.phone == null) {
        discounts = 15
    }
    else if (user !== undefined) {
        discounts = 5
    }

    res.json({
        'discounts': discounts,
        'preferences': user_preferences
    })
})

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