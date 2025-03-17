const passport = require("passport");

function getLogin(req, res) {
    res.render("login");
}

async function loginUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err); 
        }
        if (!user) {
            return res.status(400).json({ message: info.message }); 
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect("/folders"); 
        });
    })(req, res, next);
}

module.exports = { getLogin, loginUser };