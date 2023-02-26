const mongoose = require('mongoose');

const entertainmentSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Title is missing'],
		},
		thumbnail: {
			trending: {
				small: {
					type: String,
					required: [true, 'Small trending thumbnail is missing'],
				},
				large: {
					type: String,
					required: [true, 'Large trending thumbnail is missing'],
				},
			},
			regular: {
				small: {
					type: String,
					required: [true, 'Small regular thumbnail is missing'],
				},
				medium: {
					type: String,
					required: [true, 'Medium regular thumbnail is missing'],
				},
				large: {
					type: String,
					required: [true, 'Large regular thumbnail is missing'],
				},
			},
		},
		year: {
			type: Number,
			required: [true, 'Year is missing'],
		},
		category: {
			type: String,
			required: [true, 'Category is missing'],
		},
		rating: {
			type: String,
			required: [true, 'Rating is missing'],
		},
	},
	{
		timestamps: true,
	}
);

const Entertainment = mongoose.model('Entertainment', entertainmentSchema);

module.exports = Entertainment;
