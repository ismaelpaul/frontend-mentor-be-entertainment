const express = require('express');
const {
	getBookmarks,
	addBookmark,
	deleteBookmark,
} = require('../controllers/bookmark.controllers');

const { protect } = require('../middleware/auth.middleware');

const bookmarkRouter = express.Router();

bookmarkRouter.post('/', protect, addBookmark);
bookmarkRouter.get('/', protect, getBookmarks);
bookmarkRouter.delete('/:id', protect, deleteBookmark);

module.exports = bookmarkRouter;
