var express = require('express');
var router = express.Router();
var parser = require('rss-parser');

/* GET home page. */
router.get('/', function(req, res, next) {

	function formattedDate(date) {
  	var mon = new Array();
        mon[0] = "January"; mon[1] = "February"; mon[2] = "March"; mon[3] = "April"; mon[4] = "May"; mon[5] = "June"; mon[6] = "July"; mon[7] = "August"; mon[8] = "September"; mon[9] = "October"; mon[10] = "November"; mon[11] = "December"; 

        var d = new Date(date || Date.now()),
        
        month = '' + (mon[d.getMonth()]),
        day = '' + d.getDate(),
        year = d.getFullYear();

    	if (day.length < 2) day = '0' + day;

    	return [month, day].join(' ');
	}
	
	// GET POSTS from jaap.ninja
	parser.parseURL('https://jaap.ninja/rss/', function(err, parsed) {
		if (err) {
			res.render('index', { title: 'Bakker Labs'});
		} else {
			var posts = [{title: '', description: '', date: '', link: ''}, {title: '', description: '', date: '', link: ''}];
			for (var i = 0; i < 2; i++) {
				posts[i].title = parsed.feed.entries[i].title;
				posts[i].description = parsed.feed.entries[i].contentSnippet.substring(0,140)+"...";
				posts[i].date = formattedDate( parsed.feed.entries[i].pubDate );
				posts[i].link = parsed.feed.entries[i].link;
			}	
			
			res.render('index', { title: 'Bakker Labs', posts: posts});
		}
	});

});

module.exports = router;
