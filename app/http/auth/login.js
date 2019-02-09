const jwt = require('jsonwebtoken');
const passport = require('passport');

var Login = function(req, res) {
    delete req.user.password;
    delete req.user.remember_token;
    //lets generate jwt token
    const token = jwt.sign(req.user, 'LyriKal');
    return res.json(token);
}

module.exports = Login;
