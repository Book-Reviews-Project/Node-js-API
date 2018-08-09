const {
	sequelize,
	dataTypes,
	checkModelName,
	checkPropertyExists
} = require('sequelize-test-helpers');

const UserModel = require('../../../server/models/user');

describe('User model tests:', () => {
	const User = UserModel(sequelize, dataTypes);
	const user = new User();

	it('model should have name user', () => {
		checkModelName(user)('User');
	});

	context('model should have properties', () => {
		['name', 'email', 'password', 'image'].forEach(checkPropertyExists(user));
	});
});