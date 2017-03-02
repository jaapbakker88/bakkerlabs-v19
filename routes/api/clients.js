var express = require('express');
var router = express.Router();

var jwt         = require('jsonwebtoken');
var config      = require('./../../config/config')

// Models
var Client     = require('./../../models/client');


// Routes
router.use(function(req, res, next) {
    // do logging
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;    
            next();
        }
    });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });

    }

});


// Add new client
router.route('/clients')
	.post(function(req, res) {
        
        var client = new Client();    // create a new instance of the client model
        client.name = req.body.name;  // set the clients info (comes from the request)
        client.description = req.body.description;
        client.url = req.body.url;    

        // save the client and check for errors
        client.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Client succesfully created!' });
        });
        
    })

    // get all the clients (accessed at GET http://localhost:8080/api/clients)
    .get(function(req, res) {
        Client.find(function(err, clients) {
            if (err){
                res.send(err);
            }

            res.json(clients);
        });
    });

router.route('/clients/:client_id')

    // get the client with that id (accessed at GET http://localhost:8080/api/clients/:client_id)
    .get(function(req, res) {
        Client.findById(req.params.client_id, function(err, client) {
            if (err) {
                res.send(err);
            }

            res.json(client);
        });
    })

    // update the client with this id (accessed at PUT http://localhost:8080/api/clients/:client_id)
    .put(function(req, res) {

        // use our client model to find the client we want
        Client.findById(req.params.client_id, function(err, client) {

            if (err) {
                res.send(err);
            }

            client.name = req.body.name;  // update the clients info
            client.description = req.body.description;
            client.url = req.body.url; 

            // save the client
            client.save(function(err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'client updated!' });
            });

        });
    })

    // delete the client with this id (accessed at DELETE http://localhost:8080/api/clients/:client_id)
    .delete(function(req, res) {
        Client.remove({
            _id: req.params.client_id
        }, function(err, client) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });




module.exports = router;