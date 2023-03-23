const asyncHandler = require('express-async-handler');
const Bookmark = require('../models/bookmark.models');

exports.getBookmarks = asyncHandler(async (req, res) => {
	const bookmarks = await Bookmark.find({ user: req.user.id }).sort(
		'-createdAt'
	);
	res.status(200).json(bookmarks);
});

exports.addBookmark = asyncHandler(async (req, res) => {
	const { title, thumbnail, year, category, rating, isTrending, isBookmarked } =
		req.body;

	if (!title || !thumbnail || !year || !category || !rating) {
		res.status(400);
		throw new Error('Some field is missing');
	}
	const bookmark = await Bookmark.create({
		user: req.user.id,
		title,
		thumbnail,
		year,
		category,
		rating,
		isTrending,
		isBookmarked: true,
	});

	res.status(201).json(bookmark);
});

exports.deleteBookmark = asyncHandler(async (req, res) => {
	const singleBookmark = await Bookmark.findById(req.params.id);
	const { id } = req.params;

	if (!singleBookmark) {
		res.status(400);
		throw new Error('Bookmark not found');
	}

	if (singleBookmark.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}
	await Bookmark.deleteOne({ _id: id });
	res.status(200).json({ message: 'Bookmark removed successfully' });
});
