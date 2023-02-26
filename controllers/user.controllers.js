const asyncHandler = require('express-async-handler');
const User = require('../models/user.models');
const jwt = require('jsonwebtoken');

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

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('Email has already been registered');
	}

	// Create new user
	const user = await User.create({
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

	if (user) {
		const { _id, email, picture } = user;
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
