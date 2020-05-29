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

// router.post('/user/:id/edit/profile_image_cropped', upload.single('profile_image_cropped'), function(req, res){
// 	console.log(req.body);
// 	console.log('triggered');
// })

router.post('/user/:id/edit', function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			flash('error', 'Can not find user');
			res.redirect('/');
		}else{
			var cropped_data = req.body.cropped_profile_image.replace(/^data:image\/\w+;base64,/, "");
			
			

			var directory = 'public/uploads/profiles/' + foundUser._id;
			var cropped_path = 'public/uploads/profiles/' + foundUser._id +'/cropped_profile.jpg';
			var cropped_mongoPath = '/uploads/profiles/' + foundUser._id +'/cropped_profile.jpg';


			if (!fs.existsSync(directory)){
				fs.mkdir(directory, { recursive: true }, (err) => {
	  				if (err) throw err;
				});
			}

			var buf = new Buffer(cropped_data, 'base64');
			fs.writeFileSync(cropped_path, buf, (err) => {
				if(err){
					console.log(err);
				}
			});

			//in case of edit mode
			if( req.body && req.body.profile_image){
				var profile_data = req.body.profile_image.replace(/^data:image\/\w+;base64,/, "");
				var profile_path = 'public/uploads/profiles/' + foundUser._id +'/profile.jpg';
				var profile_mongoPath = '/uploads/profiles/' + foundUser._id +'/profile.jpg';

				var buf = new Buffer(profile_data, 'base64');
				fs.writeFileSync(profile_path, buf, (err) => {
					if(err){
						console.log(err);
					}
				});
				foundUser.profile_image.profile_path = profile_mongoPath;
			}

			
			foundUser.profile_image.cropped_profile_path = cropped_mongoPath;
			foundUser.profile_image.orient = req.body.orient;
			foundUser.save(function(err){
				if(err){
					console.log(err)
				}
				res.redirect('/user/' + foundUser._id);
			});
			
		}
	});
});

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