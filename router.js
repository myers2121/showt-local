var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

router.get('/', function(req,res){
	res.render('index');
});

router.get('/benefits', function(req,res) {
	res.render('benefits');
});

router.get('/get-started',function(req,res) {
	res.render('getStarted');
});

router.get('/about',function(req,res) {
	res.render('about');
});

router.get('/business/dashboard',function(req,res) {
	res.render('businessDashboard');
});

router.get('/help',function(req,res) {
	res.render('help');
});

router.get('/business/login',function(req,res) {
	res.render('businessLogin');
});

router.get('/business/signup',function(req,res) {
	res.render('businessSignUp');
});

module.exports = router;
