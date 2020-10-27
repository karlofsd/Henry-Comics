const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const {User} = require('../db');
const config = require('./config-google');

passport.use(new GoogleStrategy({
  clientID: config.clientId,
  clientSecret: config.secret,
  callbackURL: 'http://localhost:3001/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    const user = profile._json;
    console.log('googleUser', user);
    
    User.findOrCreate({
      where:{
        email: user.email
      },
      defaults: {
        username: user.given_name,
        email: user.email,
        password: user.sub
      }
    })
    .then((user) => {
      console.log(user);
      cb(null, user[0])
    })
  }));