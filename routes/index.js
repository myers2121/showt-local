var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

/* GET */

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

	router.get('/business/orders',function(req,res) {
		res.render('businessOrders');
	});

	router.get('/business/order',function(req,res) {
		res.render('viewOrder');
	});

	router.get('/business/payments', function(req,res) {
		res.render('businessPayments');
	});

	router.get('/business/inbox',function(req,res) {
		res.render('businessInbox');
	});

	router.get('/help',function(req,res) {
		res.render('help');
	});

	// Route for businesses to create their own campaigns

	router.get('/influencers',function(req,res) {
		res.render('hireInfluencers');
	});

	router.get('/influencers/:userId',function(req,res) {
		res.render('hireInfluencersFinal');
	});

	router.get('/login',function(req,res) {
		res.render('businessLogin');
	});

	router.get('/business/signup',function(req,res) {
		res.render('businessSignUp');
	});

	// Takes the influencer to their own profile after they have logged in

	router.get('/users/:userId',function(req,res) {
		res.render('influencerPrivateProfile');
	});

	// Takes the website user to the public profile for the influencer

	router.get('/:userId', function(req,res) {
		res.render('influencerPublicProfile');
	});

/* POST */

	router.post('/', jsonParser ,function(req,res) {

		// This is checking to see if there is a query variable named raw.
		var fullName = req.body.full_name;
		var email = req.body.email;
		var subject = "Website contact form";
		var phoneNumber = req.body.phone_number;
		var emailSubject = req.body.subject;
		var message = req.body.message;

		// create reusable transporter object using SMTP transport
		var transporter = nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: 'connor.myers21@gmail.com',
		        pass: 'Astral21!'
		    }
		});

		// NB! No need to recreate the transporter object. You can use
		// the same transporter object for all e-mails

		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: fullName + " " + email, // sender address
				to: "connor.myers21@gmail.com",
		    subject: subject, // Subject line
		    text: message, // plaintext body
		    html: '<p>Name: ' + fullName + '</b><p>Email:' + email + '</b><p>Subject: ' + subject + '</b><p>' + message + '</p>'   // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});

		var backURL = req.header('Referer') || '/';

	    // do your thang
		res.render('index',{
			formSubmission: true
		});

	});

module.exports = router;
