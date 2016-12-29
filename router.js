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

router.get('/business/dashboard/create-campaign',function(req,res) {
	res.render('createCampaign');
})

module.exports = router;
