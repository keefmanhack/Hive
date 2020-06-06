var express = require('express'),
	router	= express(),
	passport = require('passport'),
	multer	 = require('multer'),
	upload   = multer({storage: multer.memoryStorage()}),
	fs 		 = require('fs'),
	clearbit = require('clearbit')('sk_ef5a2ccffe2f8e4e0a3aa0dd59e0df9d');

var User = require("../models/user");
var Talent = require("../models/talent");

router.get('/', function(req, res){
	res.render('home');
});

router.get('/searchResult', function(req, res){
	res.render('results');
});

// router.post('/user/:id/talent/:talent_id/newimage', verifyTalentUserRel(), function(req, res){
// 	User.findById(req.params.id, function(err, foundUser){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			var cropped_data = req.body.cropped_profile_image.replace(/^data:image\/\w+;base64,/, "");
			
// 			var directory = 'public/uploads/profiles/' + foundUser._id;
// 			var cropped_path = 'public/uploads/profiles/' + foundUser._id +'/cropped_profile.jpg';
// 			var cropped_mongoPath = '/uploads/profiles/' + foundUser._id +'/cropped_profile.jpg';


// 			if (!fs.existsSync(directory)){
// 				fs.mkdir(directory, { recursive: true }, (err) => {
// 	  				if (err) throw err;
// 				});
// 			}

// 			var buf = new Buffer(cropped_data, 'base64');
// 			fs.writeFileSync(cropped_path, buf, (err) => {
// 				if(err){
// 					console.log(err);
// 				}
// 			});

// 			//in case of edit mode
// 			if( req.body && req.body.profile_image){
// 				var profile_data = req.body.profile_image.replace(/^data:image\/\w+;base64,/, "");
// 				var profile_path = 'public/uploads/profiles/' + foundUser._id +'/profile.jpg';
// 				var profile_mongoPath = '/uploads/profiles/' + foundUser._id +'/profile.jpg';

// 				var buf = new Buffer(profile_data, 'base64');
// 				fs.writeFileSync(profile_path, buf, (err) => {
// 					if(err){
// 						console.log(err);
// 					}
// 				});
// 				foundUser.profile_image.profile_path = profile_mongoPath;
// 			}

			
// 			foundUser.profile_image.cropped_profile_path = cropped_mongoPath;
// 			foundUser.profile_image.orient = req.body.orient;
// 			foundUser.save(function(err){
// 					if(err){
// 						console.log(err)
// 					}
// 				res.redirect('/user/' + foundUser._id);

// 			foundUser.talents.main_photos.push();
// 		}
// 	})
// })

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

router.get('/user/:id/work/:work_id', function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			flash('error', 'Can not find user');
			res.redirect('/');
		}else{
			foundUser.about.work.forEach(function(o){
				if(o._id == req.params.work_id){
					res.send(o);
				}
			})
			console.log('There was an error finding work');
		}
	})
});

router.put('/user/:id/work/:work_id', function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			flash('error', 'Can not find user');
			res.redirect('/');
		}else{
			for(var i =0; i < foundUser.about.work.length; i++){
				if(foundUser.about.work[i]._id == req.params.work_id){
					foundUser.about.work[i] = req.body;
					console.log(req.body);
					foundUser.save(function(err){
						if(err){
							console.log('err saving user');
						}else{
							console.log(foundUser);
							res.redirect('/user/' + foundUser._id);
						}
					})
				}
			}
			console.log('There was an error finding work');
		}
	})
})

router.delete('/user/:id/work/:work_id', function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			flash('error', 'Can not find user');
			res.redirect('/');
		}else{
			for(var i =0; i < foundUser.about.work.length; i++){
				if(foundUser.about.work[i]._id == req.params.work_id){
					foundUser.about.work.splice(i, 1);
					foundUser.save(function(err){
						if(err){
							console.log('err saving user');
						}else{
							console.log(foundUser);
							res.redirect('/user/' + foundUser._id);
						}
					})
				}
			}
			console.log('There was an error finding work');
		}
	})
})

router.post('/user/:id/work/new', function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if (err){
			console.log(err);
			req.flash('error', 'Could not add this new workplace');
		}else{
			foundUser.about.work.push(req.body);
			foundUser.save(function(err){
				res.redirect('/user/' + foundUser._id);
			});
		}
		
		
	})
})

router.post('/user/:id/edit/bio', function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			console.log(err);
			req.flash('error', 'Could not update user');	
		}else{
			foundUser.about.bio.text = req.body.text;
			foundUser.save(function(err){
				res.redirect('/user/' + foundUser._id);
			});
		}
		
	})
})

router.post('/user/:id/edit_profile_image', function(req, res){
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

// router.post('/user/:id/edit/about', function(req, res){
// 	User.findByIdAndUpdate(req.params.id, req.body, function(err, updatingUser){
// 		if(err){
// 			console.log(err);
// 			req.flash('error', 'Could not update bio');
			
// 		}
// 		res.redirect('back');
// 	})
// })

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