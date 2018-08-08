const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers').reviewController;
const routeProtection = require('../utils/tokens').validateToken;

router
	.post('/create', routeProtection, ReviewController.create)
	.get('/:title', ReviewController.get)
	.get('/search/:title', ReviewController.search);

module.exports = router;