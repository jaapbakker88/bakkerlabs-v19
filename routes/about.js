var express = require('express');
var router = express.Router();



/* GET work page. */
router.get('/', function(req, res, next) {

	res.render('about', {title: 'About - Bakker Labs'});
});

module.exports = router;