const encryptUtils = require('../utils/encrypt');
const tokenUtils = require('../utils/tokens');
const User = require('../models').user;
const Review = require('../models').review;
const Op = require('sequelize').Sequelize.Op;
const userController = require('./user-controller')(encryptUtils, tokenUtils, User);
const reviewController = require('./review-controller')(User, Review, Op);

module.exports = {
	userController,
	reviewController
};