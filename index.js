'use strict';

var express = require('express');

var bodyParser = require('body-parser');

var nodemailer = require('nodemailer');

var Firebase = require("firebase");

var myFirebaseRef = new Firebase("https://bg-outfitters.firebaseio.com/");
var myFirebaseUsersRef = new Firebase("https://bg-outfitters.firebaseio.com/helpdata")

var questions = ["third question", "Fourth question", "Fifth question", "Sixth question"];
var answers = ["third answer", "Fourth answer", "Fifth answer", "Sixth answer"];

var postsRef = myFirebaseRef.child("helpQuestions");

// for(var i = 0; i < 4; i++) {
// 	postsRef.push().set({
// 	    question: questions[i],
// 	    answer: answers[i]
// 	});
// }

var app = express();
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use('/static' , express.static(__dirname + '/public'));
app.use(bodyParser());
app.set('view engine', 'jade');
app.set('views', __dirname +  '/templates');

app.get('/', function(req,res){
	res.render('index');
});


app.get('/register',function(req,res) {
	res.render('register');
});

app.get('/faq', function(req,res) {
	res.render('faq');
});

app.get('/login', function(req,res) {
	res.render('login');
});

app.get('/admin', function(req,res) {
	res.render('admin');
});

app.post('/', jsonParser ,function(req,res) {
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
	    //to: 'david@trelleborgtechnologyservices.com', // list of receivers
			to: 'connor.myers21@gmail.com',
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

	var backURL=req.header('Referer') || '/';
    // do your thang
	res.render('index',{
		formSubmission: true
	});

})

app.listen(process.env.PORT || 3000, function() {
	console.log("The frontend server is running on port 3000!");
});
