var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');

module.exports = Haiku = mongoose.model('Haiku', {
	title: String,
	body: String,
	author: String,
	createdAt: Date,
	updatedAt: Date
});