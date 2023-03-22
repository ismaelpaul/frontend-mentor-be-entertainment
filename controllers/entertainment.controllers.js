const asyncHandler = require('express-async-handler');
const Entertainment = require('../models/entertainment.models');

exports.getAllEntertainments = asyncHandler(async (req, res) => {
	const entertainments = await Entertainment.find();
	res.status(200).json(entertainments);
});

exports.getSingleEntertainment = asyncHandler(async (req, res) => {
	const singleEntertainment = await Entertainment.findById(req.params.id);

	if (!singleEntertainment) {
		res.status(404);
		throw new Error('Show not found');
	}

	res.status(200).json(singleEntertainment);
});
