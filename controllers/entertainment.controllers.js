const asyncHandler = require('express-async-handler');
const Entertainment = require('../models/entertainment.models');

exports.getAllEntertainments = asyncHandler(async (req, res) => {
	const entertainments = await Entertainment.find();
	res.status(200).json(entertainments);
});
