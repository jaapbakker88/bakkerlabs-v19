var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var validator = require('email-validator');

var auth = {
  auth: {
    api_key: 'key-5728d19846ec0b4b7e540a6739a06b0a',
    domain: 'mg.bakkerlabs.nl'
  }
}

/* GET contact page. */
router.get('/', function(req, res, next) {
	res.render('contact', {title: 'Contact us!'})
});

router.post('/', function(req, res) {

	var email_check = validator.validate(req.body.email);

	// Honeypot for spambots
	if (req.body.company) {
		res.render('contact', {
        	title: 'Contact us!',  
        	err: true, 
        	page: 'contact',
        	body: req.body.message,
        	name: req.body.name,
        	email: req.body.email,
        	msg: 'Spambot detected! Your message has not been send. Please contact us per email or telephone.',
        	description: 'spam'
        });
        return;
	} else if (! req.body.name || ! req.body.email || ! req.body.message) {
		res.render('contact', {
        	title: 'Contact us!',  
        	err: true, 
        	page: 'contact',
        	body: req.body.message,
        	name: req.body.name,
        	email: req.body.email,
        	msg: 'Please fill in all the fields. Thank you.',
        	description: 'Email not send.'
        });
        return;
	} else if (email_check == false) {
		res.render('contact', {
        	title: 'Contact us!',  
        	err: true, 
        	page: 'contact',
        	body: req.body.message,
        	name: req.body.name,
        	email: req.body.email,
        	msg: 'Please enter a valid email adres!',
        	description: 'Email not send.'
        });
        return;
	} else {
	    var nodemailerMailgun = nodemailer.createTransport(mg(auth))
	    var mailOptions = {
	        from: req.body.email, // sender address
	        to: "hello@bakkerlabs.nl", // list of receivers
	        subject: "inquiry from " + req.body.name,
	        text: req.body.message
	    }

	    // send email
	    nodemailerMailgun.sendMail(mailOptions, function(error, response){
	        if(error){
	            console.log(error);
	            // res.send({"error": true, "message": response.message});
	            res.render('contact', {
	            	title: 'Contact us!', 
	            	msg: 'Oops an error occured. The message could not be send.', 
	            	err: true, 
	            	page: 'contact'
	            });

	        } else {
	            console.log("Message sent: " + response.message);
	            // res.send({"error": false, "message": response.message});
	            res.render('contact', {
	            	title: 'Contact us!', 
	            	msg: 'Message sent! Thanks you.', 
	            	err: false, 
	            	page: 'contact'
	            });
	        }
	    });
	}

})

module.exports = router;