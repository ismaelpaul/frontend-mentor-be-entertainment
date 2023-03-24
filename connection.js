const app = require('./server');
const mongoose = require('mongoose');

const { PORT = 9090 } = process.env;

//Connect DB and start server
mongoose

	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(PORT, (err) => {
			if (err) throw err;
			console.log(`Listening on port ${PORT}...`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
