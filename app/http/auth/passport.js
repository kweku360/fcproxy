const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var UserCluster = require('../../db/bookshelf/clusters/UserCluster')


// passport.initialize();

passport.use('local',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {

        // lets hash password first

        UserCluster.checkLogin(email,password).then(function(user) {
            cb(null, user)
        }).catch(err=>{
            return cb(null, false)
        });
    }
));

//passport.js
passport.use('jwt',new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'LyriKal'
    },
    function (jwtPayload, cb) {
         console.log(jwtPayload);
         return cb(null,"kankam")
        //return cb(err)
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        // return UserModel.findOneById(jwtPayload.id)
        //     .then(user => {
        //         return cb(null, user);
        //     })
        //     .catch(err => {
        //         return cb(err);
        //     });
    }
));