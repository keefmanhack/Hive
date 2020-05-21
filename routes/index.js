var express = require('express'),
	router	= express();

router.get('/', function(req, res){
	res.render('home');
});

router.get('/searchResult', function(req, res){
	res.render('results');
})

module.exports = router;