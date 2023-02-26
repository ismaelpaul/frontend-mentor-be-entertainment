const asyncHandler = require('express-async-handler');
const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error("Can't be empty");
	}

	if (password.length < 8) {
		res.status(400);
		throw new Error('Password must have at least 8 characters');
	}

	//Check if user exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('Email has already been registered');
	}

	// Create new user
	const newUser = await User.create({
		email,
		password,
	});

	// Generate token
	const token = generateToken(user._id);

	//Send http-only cookie
	res.cookie('token', token, {
		path: '/',
		httpOnly: true,
		expires: new Date(Date.now() + 1000 * 86400), //1 day,
		sameSite: 'none',
		secure: true,
	});

	if (newUser) {
		const { _id, email, picture } = newUser;
		res.status(201).json({
			_id,
			email,
			picture,
			token,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

exports.loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error("Can't be empty");
	}

	//Check if user exists
	const userExists = await User.findOne({ email });

	if (!userExists) {
		res.status(400);
		throw new Error('User not found, please sign up');
	}

	//User exists, check if password is correct
	const passwordIsCorrect = await bcrypt.compare(password, userExists.password);

	// Generate token
	const token = generateToken(userExists._id);

	// Send HTTP-only cookie
	if (passwordIsCorrect) {
		res.cookie('token', token, {
			path: '/',
			httpOnly: true,
			expires: new Date(Date.now() + 1000 * 86400), //1 day,
			sameSite: 'none',
			secure: true,
		});
	}

	if (userExists && passwordIsCorrect) {
		const { _id, email, picture } = userExists;

		res.status(200).json({ _id, email, picture, token });
	} else {
		res.status(400);
		throw new Error('Invalid email or password');
	}
});

exports.logoutUser = asyncHandler(async (req, res) => {
	res.cookie('token', '', {
		path: '/',
		httpOnly: true,
		expires: new Date(0), // expires cookie
		sameSite: 'none',
		secure: true,
	});
	return res.status(200).json({ message: 'Logged out successfully' });
});

exports.loggedinUser = asyncHandler(async (req, res) => {
	const token = req.cookies.token;

	if (!token) {
		return res.json(false);
	}

	const verified = jwt.verify(token, process.env.JWT_SECRET);

	if (verified) {
		return res.json(true);
	}
	return res.json(false);
});
