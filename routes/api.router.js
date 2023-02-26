const express = require('express');
const { getApi } = require('../controllers/api.controllers');
const bookmarkRouter = require('./bookmark.router');
const entertainmentRouter = require('./entertainment.router');
const userRouter = require('./user.router');

const apiRouter = express.Router();

// /api
apiRouter.get('/', getApi);

// /user
apiRouter.use('/user', userRouter);

// /bookmarks
apiRouter.use('/bookmarks', bookmarkRouter);

// /entertainments
apiRouter.use('/entertainments', entertainmentRouter);

module.exports = apiRouter;
