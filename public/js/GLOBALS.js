/*
 * GLOBAL NAME SPACE FUNCTIONS
 *
 * Name your shit carefully.
 */

// INITIALIZE FIREBASE

let config = {
	apiKey: "AIzaSyAKkB_r5nczVYp8v5Jq6t4ysPvYyq1kYZE",
	authDomain: "showt-5308e.firebaseapp.com",
	databaseURL: "https://showt-5308e.firebaseio.com",
	storageBucket: "showt-5308e.appspot.com",
	messagingSenderId: "411754443272"
};

firebase.initializeApp(config);

/*
 * build and return form data as an object
 * selector - string/jQuery selector - the selector for the form
 *          e.g. '#my-form'
 *
 * returns object data
 */
const getFormData = function buildFormDataUsingSelector( selector ) {

	let raw = $( selector ).serializeArray();

	let data = {};

	for ( i in raw ) {

		if ( !raw[i].hasOwnProperty('name') || !raw[i].hasOwnProperty('value') )
			continue;

		data[ raw[i].name ] = raw[i].value;

	}

	return data;

}