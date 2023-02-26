const express = require('express');
const {
	registerUser,
	loginUser,
	logoutUser,
	loggedinUser,
} = require('../controllers/user.controllers');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);
userRouter.get('/loggedin', loggedinUser);

module.exports = userRouter;
