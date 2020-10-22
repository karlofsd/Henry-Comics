const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {User} = require('../db.js')

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
    
      User.findOne({where:{ username: username }},)
        .then(user=>{
          if(!user){
            return done(null, false)
          }
          bcrypt.compare(password, user.password).then(res=>{
            if(res){
              return done(null, user,)
            }else{
              return done(null,false)
            }
          })
        })
      
      //   (err, user) => {
      //   if (err) throw err;
      //   if (!user) return done(null, false);
      //   bcrypt.compare(password, user.password, (err, result) => {
      //     if (err) throw err;
      //     if (result === true) {
      //       return done(null, user);
      //     } else {
      //       return done(null, false);
      //     }
      //   });
      // })

    })
      )

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      
      cb(err, userInformation);
    });
  });
}
