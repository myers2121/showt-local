var paypal = require('paypal-rest-sdk');
var config = {};

// Routes

exports.index = function (req, res) {
  res.render('index');
};

exports.create = function (req, res) {
  console.log("This was called");
	// var method = req.param('method');
  // var currency = req.param('currency');
  // var amount = req.param('amount');
  // var firstName = req.param('first_name');
  // var lastName = req.param('last_name');
  // var cardNumber = req.param('number');
  // var expirationMonth = req.param('expire_month');
  // var expirationYear = req.param('expire_year');
  // var secutiryCode = req.param('cvv2');
  // var cardType = req.param('type');

  //var method = req.param('method');
  var method = 'credit_card';
	var payment = {
		"intent": "sale",
		"payer": {
		},
		"transactions": [{
			"amount": {
				"currency": 'usd',
				"total": '500'
			},
			"description": 'This is the description'
		}]
	};

	if (method === 'paypal') {
		payment.payer.payment_method = 'paypal';
		payment.redirect_urls = {
			"return_url": "http://pprestnode.herokuapp.com/execute",
			"cancel_url": "http://pprestnode.herokuapp.com/cancel"
		};
	} else if (method === 'credit_card') {
		var funding_instruments = [
			{
				"credit_card": {
					"type": 'visa',
					"number": '5500005555555559',
					"expire_month": 12,
					"expire_year": 2018,
					"first_name": 'Joe',
					"last_name": 'Shopper'
				}
			}
		];
		payment.payer.payment_method = 'credit_card';
		payment.payer.funding_instruments = funding_instruments;
	}

	paypal.payment.create(payment, function (error, payment) {
		if (error) {
			console.log(error);
			res.render('error', { 'error': error });
		} else {
			req.session.paymentId = payment.id;
			res.render('create', { 'payment': payment });
		}
	});

};

exports.execute = function (req, res) {
	var paymentId = req.session.paymentId;
	var payerId = req.param('PayerID');

	var details = { "payer_id": payerId };
	var payment = paypal.payment.execute(paymentId, details, function (error, payment) {
		if (error) {
			console.log(error);
			res.render('error', { 'error': error });
		} else {
			res.render('execute', { 'payment': payment });
		}
	});
};

exports.cancel = function (req, res) {
  res.render('cancel');
};

// Configuration

exports.init = function (c) {
	config = c;
	paypal.configure(c.api);
};
