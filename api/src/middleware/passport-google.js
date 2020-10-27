const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const {User} = require('../db');
const {
  CLIENT_ID, CLIENT_SECRET,
} = process.env;

passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
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