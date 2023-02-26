const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, "Can't be empty"],
			unique: true,
			trim: true,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Please enter a valid email',
			],
		},
		password: {
			type: String,
			required: [true, "Can't be empty"],
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

// Encrypt password before sending to db
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(this.password, salt);
	this.password = hashedPassword;
	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
