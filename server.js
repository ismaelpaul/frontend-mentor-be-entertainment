const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const errorHandler = require('./middleware/error.middleware');
const apiRouter = require('./routes/api.router');
const cookieParser = require('cookie-parser');

const app = express();

const whitelist = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// Route
app.use('/api', apiRouter);

// Error
app.use('/*', (req, res) => {
	res.status(404).send({ msg: 'Page not found.' });
});

app.use(errorHandler);

module.exports = app;
