"use strict";
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();


const login = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
        console.log(info);
        return res.status(401).json({
            message: 'Username / password is wrong',
        });
    }
   req.login(user, {session: false}, (err) => {
       if (err) {
           res.json({message: err});
       }
       // generate a signed json web token with the contents of user object and return it in the response
       const token = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET);
       return res.json({user, token});
    });
})(req, res);
};

const logout = (req, res) => {
    res.json({message: 'Logged out!'});
};

module.exports = {
  login,
  logout,
};