const express = require('express');
const router = express.Router();
const UserController = require('../controllers').userController;
const routeProtection = require('../utils/tokens').validateToken;

router
	.post('/register', UserController.create)
	.post('/signin', UserController.signin)
	.get('/:name', routeProtection, UserController.get);

module.exports = router;