var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: String,
	url: String
})

module.exports = mongoose.model('Client', ClientSchema);