'use strict';

var express = require('express');
//var routes = require('./routes');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var paypal = require('paypal-rest-sdk');
var session = require('express-session');
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://bg-outfitters.firebaseio.com/");
var myFirebaseUsersRef = new Firebase("https://bg-outfitters.firebaseio.com/helpdata")
var postsRef = myFirebaseRef.child("helpQuestions");
var app = express();
var jsonParser = bodyParser.json()

// try {
//     var configJSON = fs.readFileSync(__dirname + "/config.json");
//     var config = JSON.parse(configJSON.toString());
// } catch (e) {
//     console.error("File config.json not found or is invalid: " + e.message);
//     process.exit(1);
// }
// routes.init(config);

paypal.configure({
  'mode': 'live', //sandbox or live
  'client_id': 'AUSgFjXFykMkDNq9eegraV_jccHjfyhIcNiGPoyv4yxYF_b0u3AgVgmRHtxRKNNG7phTdMJDZeTw3_ur',
  'client_secret': 'EO8xMKpWBjE662I-hlhjiwphjs14mk3d1l_6t6ox4W7OSu7bX5roV7MCJ3Tclmuqc39VyJ5rGDGzhh84'
});

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use('/static' , express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.set('view engine', 'jade');
app.set('views', __dirname +  '/templates');

app.get('/', function(req,res){
	res.render('index');
});

//app.get('/', routes.index);
//app.get('/create', routes.create);
app.get('/execute', routes.execute);
app.get('/cancel', routes.cancel);

app.post('/paynow', function(req, res) {
   // paypal payment configuration.
  var payment = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": app.locals.baseurl+"/success",
    "cancel_url": app.locals.baseurl+"/cancel"
  },
  "transactions": [{
    "amount": {
      "total": '250',
      "currency":  'USD'
    },
    "description": 'Here is the description'
  }]
};

  paypal.payment.create(payment, function (error, payment) {
  if (error) {
    console.log(error);
  } else {
    if(payment.payer.payment_method === 'paypal') {
      req.paymentId = payment.id;
      var redirectUrl;
      console.log(payment);
      for(var i=0; i < payment.links.length; i++) {
        var link = payment.links[i];
        if (link.method === 'REDIRECT') {
          redirectUrl = link.href;
        }
      }
      res.redirect(redirectUrl);
    }
  }
});
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
