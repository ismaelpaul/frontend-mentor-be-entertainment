const express = require('express');
const {
	getAllEntertainments,
	getSingleEntertainment,
} = require('../controllers/entertainment.controllers');
const { protect } = require('../middleware/auth.middleware');

const entertainmentRouter = express.Router();

entertainmentRouter.get('/', protect, getAllEntertainments);
entertainmentRouter.get('/:id', protect, getSingleEntertainment);

module.exports = entertainmentRouter;
