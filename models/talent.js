var mongoose = require('mongoose');

var TalentSchema = new mongoose.Schema({
	main_photos: [{
		path: String
	}]
});

module.exports = mongoose.model("Talent", TalentSchema);