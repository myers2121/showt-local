'use strict';

var express      = require('express');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var router       = require('./routes/index');
var jsonParser   = bodyParser.json();

var app          = express();

/* APP CONFIG */

app.use('/static' , express.static(__dirname + '/public'));

app.use(bodyParser());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());

/* ROUTES */

app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');

app.use('/', router);

/* ERR HANDLING */

app.get('*', function(req, res){
  res.render('404');
});

app.listen(process.env.PORT || 3000, function() {
	console.log("The frontend server is running on port 3000!");
});
