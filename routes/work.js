var express = require('express');
var router = express.Router();



/* GET work page. */
router.get('/', function(req, res, next) {

	res.render('work', {title: 'Work with us!'});
});

module.exports = router;



// // contentful variables
// var contentful = require('contentful');
// var SPACE_ID = '4cwx2dnsxmcp';
// var ACCESS_TOKEN = 'e35b9c0777927711541acc564d217b0510630d06a6eb41fa32c9476374210ebc';

	// var client = contentful.createClient({
	// 	// This is the space ID. A space is like a project folder in Contentful terms
	// 	space: SPACE_ID,
	// 	// This is the access token for this space. Normally you get both ID and the token in the Contentful web app
	// 	accessToken: ACCESS_TOKEN
	// });

	// console.log('\x1b[32m Fetching entries ... \x1b[32m')
	
	// client.getEntries()
	// .then((response) => {
		
	// 	console.log(response.items[0].sys.hero);	
	// 	// console.log(response.items.map((item) => '\x1b[32m \t> ' + item.sys.id).join('\n'))
	// })

	// .catch((error) => {
	// 	console.log('\x1b[31merror occured')
	// 	console.log(error)
	// })