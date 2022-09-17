const User = require("../Schemas/userSchema");
const passport = require("passport");

module.exports = function(app) {

    app.post('/register', (req, res) => {
        console.log(req.body)
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

}