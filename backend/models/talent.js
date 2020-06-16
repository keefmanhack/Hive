var mongoose = require('mongoose');

var TalentSchema = new mongoose.Schema({
	title: String,
	main_images: [{
		path: String,
		cropped_path: String,
		orient: {
			dimension: String,
			top: String,
			left: String
		}
	}]
});

module.exports = mongoose.model("Talent", TalentSchema);