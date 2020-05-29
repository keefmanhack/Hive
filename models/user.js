var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: {type: String, unique:true, required: true},
	password: String,
	lastName: String,
	firstName: String,
	email: {type: String, unique: true, required: true},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	profile_image: { 
		profile_path: String,
		cropped_profile_path: String,
		orient: {
			dimension: String,
			top: String,
			left: String
		}
	},
	about: {
		bio: String
	}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);