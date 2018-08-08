const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const userRoutes = require('./server/routes').UserRouter;
const reviewRoutes = require('./server/routes').ReviewRouter;

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.header('Access-Controll-Allow-Origin', '*');
	res.header(
		'Access-Controll-Allow-Headers',
		'Origin, X-Request-With, Content-Type, Accept, Authorization');

	if(req.method === 'OPTIONS') {
		res.header(
			'Access-Controll-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET');
	}

	next();
});

// use routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/review', reviewRoutes);

app.use((req, res) => {
	res.status(404).json({
		message: 'Not Found'
	});
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
	message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;