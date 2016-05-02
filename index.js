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
	        user: 'ontargetarchery38@gmail.com',
	        pass: 'Koda69bear'
	    }
	});

	// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: fullName + " " + email, // sender address
	    //to: 'david@trelleborgtechnologyservices.com', // list of receivers
			to: email,
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

});

app.post('/registeredHunter', jsonParser ,function(req,res) {
	// This is checking to see if there is a query variable named raw.

	var name = req.body.name;
	var email = req.body.email;
	var subject = "B&G Outfitters hunt registration confirmation";
	var phoneNumber = req.body.phoneNumber;
	var animalType = req.body.animalType;
	var animalPrice = req.body.animalPrice;
	var animalCity = req.body.city;
	var animalState = req.body.state;
	var animalDate = req.body.date;
	var animalTime = req.body.time;
	var confirmationNumber = req.body.confirmationNumber;

	// create reusable transporter object using SMTP transport
	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'ontargetarchery38@gmail.com',
	        pass: 'Koda69bear'
	    }
	});

	// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: name + " " + email, // sender address
	    //to: 'david@trelleborgtechnologyservices.com', // list of receivers
			to: email,
	    subject: subject, // Subject line
	    html: '<div><h3>' + name + '</h3><p>Thank you for registering for a hunt with us here at B&amp;G Outfitters. There is only one thing left that you need to complete in order to get all of the information for the hunt and that is to pay for the hunt. Below is a description of the hunt you registered for as well as a code that you will be needing when paying for the hunt. To pay for the hunt simply head to our website at www.bg-outfitters.com and click pay in the navigation bar at the top.</p></div><div><h3>Hunt Description</h3><p>' + animalType + '</p><p>$' + animalPrice + '</p><p>' +animalDate + '</p><p>' + animalCity + ', ' + animalState + '</p><p>' + animalTime + '</p></div><div><h3>Confirmation Number</h3><p>' + confirmationNumber + '</p></div>'  // html body
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
