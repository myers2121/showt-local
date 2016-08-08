var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

router.get('/', function(req,res){
	res.render('index');
});

router.get('/merchants', function(req,res) {
	res.render('merchants');
});

router.get('/support', function(req, res) {
  res.render('support');
});

router.get('/support/using-passenger', function(req,res) {
	res.render('faq');
});

router.get('/support/account-info', function(req,res) {
	res.render('faq');
});

router.get('/support/contact-support', function(req,res) {
	res.render('contactSupport');
});

router.post('/support/contact-support', function(req,res) {
	var d = req.body;
	var successMessage = "Your inquiry has been sent!";
	var captchaErrorMessage = "Are you sure you're human?";

	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'timalanfarrow@gmail.com',
	        pass: 'umayfovtsekroorb'
	    }
	});

	var mailOptions = {
		from: d.name + " " + d.email,
		to: 'connor.myers21@gmail.com',
		subject: 'Support contact form submission: ' + d.subject,
		text: d.message,
		html: "<p>" + d.name + "</p><br/>Name of person who submitted: " + d.name + "</h3><br>Number to contact them at: " + d.phone + "</pType of inquiry they are wanting: >" + d.inquiry + "</p><p>" + d.message + "</p>"
	}

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
			res.json({"success": "true"});
	});
});

router.get('/merchants/signup', function(req,res) {
	res.render('merchantSignUp');
});

router.post('/merchants/submit', function(req, res) {
	var d = req.body;
	var successMessage = "Your inquiry has been sent!";
	var captchaErrorMessage = "Are you sure you're human?";

	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'timalanfarrow@gmail.com',
	        pass: 'umayfovtsekroorb'
	    }
	});

	var mailOptions = {
		from: d.name + " " + d.email,
		to: 'connor.myers21@gmail.com',
		subject: 'Merchants form submission: ' + d.businessName,
		text: d.message,
		html: "<p>" + d.name + "</p><br/>Business submitted: " + d.businessName + "</h3><br>Number to contact them at: " + d.businessPhone + "</p><p>" + d.message + "</p>"
	}

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
			res.json({"success": "true"});
	});

});

router.get('/merchants/dashboard', function(req,res){
	res.render('dashboard');
});

module.exports = router;
