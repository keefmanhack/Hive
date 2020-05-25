var express = require('express'),
	router	= express(),
	passport = require('passport');

var User = require("../models/user");

router.get('/', function(req, res){
	res.render('home');
});

router.get('/searchResult', function(req, res){
	res.render('results');
});

router.get('/user/:id', function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			flash('error', 'Can not find user');
			res.redirect('/');
		}else{
			res.render('profile', {user: foundUser});
		}
	})
})

router.get('/signup', function(req, res){
	res.render('signup');
});

router.post("/signup", function(req, res){
	
	var newUser = new User(
		{
			username: req.body.username,
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName
		});
	if(req.body.password !== req.body.confirm){
		req.flash('error', 'Passwords do not match.');
		res.redirect('/signup');
	}else{

		User.register(newUser, req.body.password, function(err, user){
			if(err){
				req.flash('error', 'User already exists with these credentials.');
				res.redirect("/signup");
			}
			passport.authenticate('local')(req, res, function(){
				req.flash('success', 'Welcome ' + user.firstName + '.');
				res.redirect("/");
			});
		});
	}
 });

router.get('/login', function(req, res){
	res.render('login');
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login",
	failureFlash: 'Invalid username or password.',
	successFlash: 'Welcome!'
}), function(req, res){

});

router.get('/sign_out', function(req, res){
	req.logout();
	res.redirect('/');
});

module.exports = router;