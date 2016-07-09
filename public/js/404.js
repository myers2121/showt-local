$(document).ready(function() {
	var fourOhFourVM = function() {
		var self = this;

		self.links = [
				{
					'href' : '/#what-is-it',
					'title': 'What is it?'
				},
				{
					'href' : '/#how-it-works',
					'title': 'How it works'
				},
				{
					'href' : '/#our-misson',
					'title': 'Our Mission'
				},
				{
					'href' : '/#locations',
					'title': 'Locations'
				},
				{
					'href' : '/merchants',
					'title': 'Merchants'
				},
				{
					'href' : '/#contact',
					'title': 'Contact'
				},
				{
					'href' : '/#help',
					'title': 'Help'
				},
				{
					'href' : '/support',
					'title': 'Support'
				}
		]

	    self.socialMedias = [
	      {
	        'socialMedia': 'facebook',
	        'link'       : 'https://www.facebook.com/Passenger-Mobile-867565216683366/',
	        'src'        : '/static/img/facebook.png'
	      },
	      {
	        'socialMedia': 'instagram',
	        'link'       : 'https://www.instagram.com/passengermobile/',
	        'src'        : '/static/img/instagram.png'
	      },
	      {
	        'socialMedia':'youtube',
	        'link'       : 'http://www.youtube.com',
	        'src'        : '/static/img/youtube.png'
	      },
	      {
	        'socialMedia': 'twitter',
	        'link'       : 'https://twitter.com/passengermobile',
	        'src'        : '/static/img/twitter.png'
	      },
	      {
	        'socialMedia': 'snapchat',
	        'link'       : 'https://www.snapchat.com/add/passengermobile',
	        'src'        : '/static/img/snapchat.png'
	      }
	    ];

	    self.socialMediaClick = function( d ) {
	      location.href = d.link;
	    }

	    var date = new Date();
	    var year = date.getFullYear();

	    self.currentDate = ko.observable("");
	    self.currentDate(" " + year + " ");
	}

	console.log("listening")

	ko.applyBindings( fourOhFourVM, $("#bg")[0] );
})