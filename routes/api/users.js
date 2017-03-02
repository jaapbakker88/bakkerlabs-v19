var express 	= require('express');
var router 		= express.Router();
var jwt    		= require('jsonwebtoken');

var config      = require('./../../config/config')
// Models
var User     	= require('./../../models/user');

/* GET users listing. */
router.get('/setup', function(req, res) {
  // create a sample user
  var admin = new User({ 
  	name: 'admin', 
  	password: 'admin',
  	admin: true 
  });

  
  // save the sample user
  admin.save(function(err) {
  	if (err) throw err;

  	console.log('User saved successfully');
  	res.json({ success: true });
  });
});

router.post('/authenticate', function(req, res) {

	// Find the user
	User.findOne({
		name: req.body.name
	}, function(err, user) {
		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.'});
		} else if (user) {

			// Check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' })
			} else {

				// if user password is right
				// create a token
				var token = jwt.sign(user, config.secret, {
					expiresIn : 60*60*24 // Expires in 24 hours
				});

				// return information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}

		}
 	});
});



router.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});


router.post('/autenticate')











module.exports = router;
