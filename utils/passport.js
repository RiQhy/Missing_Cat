"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const { getUserLogin, getUserById } = require("../Models/userModel");
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');
require("dotenv").config();

// local strategy for username password login
passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const [user] = await getUserLogin(username);
      console.log('Local strategy', user); // result is binary row
      if (user === undefined) {
        return done(null, false, { message: "Incorrect email." });
      }
      const loginOK = await bcrypt.compare(password, user.password);
      if (!loginOK) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, { ...user }, { message: "Logged In Successfully" }); 
      // use spread syntax to create shallow copy to get rid of binary row type
    } catch (err) {
        console.log('passport error', err);
      return done(err);
    }
  })
);


//JWT strategy for handling bearer token
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET,
},
async (jwtPayload, done) => {
    console.log('user from token', jwtPayload);
    try{
        const user = await getUserById(jwtPayload.user_id);
        return done(null, user);
    } catch(error){
        return done(error);
    }
})
);

module.exports = passport;