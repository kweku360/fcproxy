const app = module.exports = require('express')();
const passport = require('passport');
var PhantomRunner = require('../http/resources/phantomrunner');
var Login = require('../http/auth/login');

// app.get('/helloworld', TestResource.TestServer);

// app.get('/fpllogin', PhantomRunner.run);
app.post('/fpllogin', PhantomRunner.run);

//Auth Routes
// app.post('/login', Login);
app.post('/login',passport.authenticate('local',{ session: false }), Login);[]