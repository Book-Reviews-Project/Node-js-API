const encryptUtils = require('../utils/encrypt');
const tokenUtils = require('../utils/tokens');
const User = require('../models').user;
const userController = require('./user-controller')(encryptUtils, tokenUtils, User);
const reviewController = require('./review-controller');

module.exports = {
	userController,
	reviewController
};