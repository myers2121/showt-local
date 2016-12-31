'use strict';

var express      = require('express');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var router       = require('./routes/index');
var jsonParser   = bodyParser.json();

var app          = express();

/* APP CONFIG */

app.use('/static' , express.static(__dirname + '/public')); // serve static requests from public

app.use(bodyParser.json());                                 // allow for json objects as post data
app.use(bodyParser.urlencoded({ extended: false }));        // don't allow for nested objects

/* ROUTES */

app.set('view engine', 'pug');                              // use pug as the view engine
app.set('views', __dirname + '/templates');                 // look up views in /templates

app.use('/', router);

/* ERR HANDLING */

app.get('*', function(req, res){
  res.render('404');
});

var port = process.env.PORT || 3000;

app.listen( port, function() {
	console.log("The frontend server is running on port " + port + "!");
});
