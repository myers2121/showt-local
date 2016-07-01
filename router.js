var express = require('express');
var router = express.Router();

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

router.get('/merchants/signup', function(req,res) {
	res.render('merchantSignUp');
});

module.exports = router;
