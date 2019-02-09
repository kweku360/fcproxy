const Nightmare = require('nightmare')
const axios = require('axios')

var PhantomRunner = {};

PhantomRunner.run = (req, res) => {
    const nightmare = Nightmare({
        show: true,
        webPreferences: {
            images: false,
        }
    })
    console.log('Nightmare starts');

    nightmare
        .goto('https://fantasy.premierleague.com/')
        .type('#ismjs-username', req.body.username)
        .type('#ismjs-password', req.body.password)
        .click('.ismjs-submit')
        .wait(3000)
        .click('.ism-nav__list > :nth-child(3) > .ism-nav__tab')
        .wait(2000)
        .url()
        .end()
        .then(function (url) {
            parseUrl(url, req.body).then(function (data) {
                var msg = {
                    'status': 1,
                    'data': data
                }
                res.send(msg)
            })
        })
        .catch(function (error) {
            res.send("error")
            console.error('Error:', error);
        });
        console.log('Nightmare Ends');


}

function parseUrl(url, req) {
    var p = new Promise(function (resolve, reject) {
        if (url.indexOf('a/team') < 0) {
            //wrong password
            var msg = {
                'status': 0,
                'error': "invalid username or password provided"
            }
            resolve(msg);
        }
        if (url.indexOf('a/team') >= 0) {
            //success
            var data = {
                'teamid': url.split('/')[5],
                'username': req.username,
                'credential': req.password,
                'url':url
            }
            resolve(sendLogin(data).then(function (mdata) {
                    return mdata
                })
                .catch(function (error) {
                    // handle error
                    reject(error);
                    console.log(error);
                }));
        }
    });
    return p;
}

function sendLogin(data) {
    var p = new Promise(function (resolve, reject) {
        axios.post('http://localhost:3000/authteaminfo',data)
            .then(function (response) {
                // handle success
                console.log(response)
                resolve(response.data)
            })
            .catch(function (error) {
                // handle error
                reject(error);
                console.log(error);
            })
    });
    return p;
}
// https://fantasy.premierleague.com/a/team/774591/event/22
module.exports = PhantomRunner;