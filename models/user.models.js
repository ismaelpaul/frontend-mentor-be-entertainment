const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
			trim: true,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Please enter a valid email',
			],
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minLength: [8, 'Password must have at least 8 characters'],
		},
		picture: {
			type: String,
			required: [true, 'Please, add a profile picture'],
			default: 'https://i.ibb.co/4pDNDk1/avatar.png',
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
