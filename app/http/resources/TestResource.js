var UserCluster = require('../../db/bookshelf/clusters/UserCluster')
var TestResource = {};


TestResource.TestServer = (req,res)=> {
    // console.log(req.user);
    res.json("hello world")
    // UserCluster.getAll().then(function(users) {res.send(users)});
}

module.exports = TestResource;