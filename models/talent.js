var mongoose = require('mongoose');

var TalentSchema = new mongoose.Schema({
	title: String,
	main_photos: [{
		path: String
	}]
});

module.exports = mongoose.model("Talent", TalentSchema);