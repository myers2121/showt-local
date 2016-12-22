var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

router.get('/', function(req,res){
	res.render('index');
});

module.exports = router;
