var User = require('../models/users')
var UserCluster = {};

UserCluster.getAll = function () {
    var p = new Promise(function (resolve,reject) {
        new User().fetchAll().then(function(users) {

            resolve(users.toJSON())
        }).catch(function(error) {
            console.log(error);
            console.log('An error occured');
        });
    });

    return p;
}

UserCluster.checkLogin = function (username,password) {
    var p = new Promise(function (resolve,reject) {

        User.where({serviceNumber:username,surname:password}).fetch().then(function(user) {

            resolve(user.toJSON())
        }).catch(function(error) {
            console.log(error);
            console.log('An error occured');
            reject(error);
        });
    });

    return p;
}


module.exports = UserCluster;