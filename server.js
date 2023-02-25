const express = require('express');
const apiRouter = require('./routes/api.router');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route
app.use('/api', apiRouter);

module.exports = app;
