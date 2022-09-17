const User = require("../Schemas/userSchema");
const UserRole = require("../Schemas/userRoles");
const WorkDay = require("../Schemas/workDays");
const menuModel = require("../Schemas/checkList");
const Order = require("../Schemas/orders");

module.exports = function(app) {
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
}