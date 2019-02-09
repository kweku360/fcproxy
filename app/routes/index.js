const app = module.exports = require('express')();

/* This file sets up the various route locations and files */
// the default ones are set up as bellow you can setup your own by following the structure

app.use('/', require('./web'));
app.use('/api', require('./api'));

