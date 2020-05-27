var express = require('express'),
	router	= express(),
	passport = require('passport'),
	multer	 = require('multer'),
	upload   = multer({storage: multer.memoryStorage()}),
	fs 		 = require('fs');

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
});

router.post('/user/:id/edit', upload.array('profile_image', 2), function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			flash('error', 'Can not find user');
			res.redirect('/');
		}else{
			console.log(req.files);
			console.log(req.body);
			// var img = req.file.buffer.toString('base64')
			// var data = img.replace(/^data:image\/\w+;base64,/, "");
			// var buf = new Buffer(data, 'base64');

			// var directory = 'public/uploads/profiles/' + foundUser._id;
			// var path = 'public/uploads/profiles/' + foundUser._id +'/profile.jpg';
			// var mongoPath = '/uploads/profiles/' + foundUser._id +'/profile.jpg';

			// if (!fs.existsSync(directory)){
			// 	fs.mkdir(directory, { recursive: true }, (err) => {
	  // 				if (err) throw err;
			// 	});
			// }

			// fs.writeFileSync(path, buf, (err) => {
			// 	if(err){
			// 		console.log(err);
			// 	}
			// });

			// foundUser.profile_image.path = mongoPath;
			// foundUser.profile_image.contentType = req.file.mimetype;
			// foundUser.profile_image.orient = req.body.orient;
			// foundUser.save();
			res.redirect('/user/' + foundUser._id);

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