const express = require('express');
const {
	getAllEntertainments,
} = require('../controllers/entertainment.controllers');

const entertainmentRouter = express.Router();

entertainmentRouter.get('/', getAllEntertainments);

module.exports = entertainmentRouter;
