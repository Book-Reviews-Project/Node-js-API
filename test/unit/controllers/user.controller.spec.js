const { expect } = require('chai');
const httpMock = require('node-mocks-http');

const getController = require('../../../server/controllers/user-controller');

describe('User controller tests:', async () => {
	let req,
		res,
		tokenUtils,
		encryptUtils;
	
	const errormsg = 'test error';

	beforeEach(() => {
		req = httpMock.createRequest({
			method: 'POST',
			body: {
				name: 'test',
				password: 'testtest',
				email: 'test@test.bg',
			}
		});
		res = httpMock.createResponse();
		tokenUtils = {
			async createToken() {
				return 'test';
			}
		};
		encryptUtils = {
			async encrypt() {
				return 'test';
			},
			async compare(a, b) {
				if(a === b) {
					return true;
				} else {
					return false;
				}
			}
		};
	});
  
	it('controller should return status 201 when creating user', async () => {
		// arrange
		const mockedUser = {User: {create: async (obj) => obj}};
		const controller = getController(encryptUtils, tokenUtils, mockedUser.User);
		const user = {
			name: req.body.name,
			email: req.body.email,
		};

		// act
		await controller.create(req, res);

		// assert
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(201);
		expect(data.message).to.be.eq('user created');
		expect(data.token).to.be.eq('test');
		expect(data.user).to.be.eql(user);
	});

	it('controller should return status 400 when creating user when error is thrown', async () => {
		// arrange
		const mockedUserThrow = {User: {create: async () =>{ throw new Error(errormsg);}}};
		const controller = getController(encryptUtils, tokenUtils, mockedUserThrow.User);

		// act
		await controller.create(req, res);

		// assert
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(400);
		expect(data.message).to.be.eq(errormsg);
	});
	
	it('controller should return status 401 when signing in when user is not found', async () => {
		// arrange
		const mockedUserAuthFail = {User: {findOne: async () => {}}};
		const controller = getController(encryptUtils, tokenUtils, mockedUserAuthFail.User);
		
		// act
		await controller.signin(req, res);

		// assert
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(401);
		expect(data.message).to.be.eq('Auth failed');
	});

	it('controller should return status 202 when signing in', async () => {
		// arrange
		const mockedUserAuthSucc = {User: {findOne: async (obj) => Object.assign({}, obj.where, req.body)}};
		const controller = getController(encryptUtils, tokenUtils, mockedUserAuthSucc.User);
		const user = {
			name: req.body.name,
			email: req.body.email,
		};

		// act
		await controller.signin(req, res);

		// assert
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(202);
		expect(data.message).to.be.eq('Auth successful');
		expect(data.token).to.be.eq('test');
		expect(data.user).to.be.eql(user);
	});

	it('controller should return 401 when signing in when passwords don\'t match', async () => {
		// aarange
		const mockedUserAuthFail = {User: {findOne: async (obj) => Object.assign({}, obj.where, req.body.password + 'test')}};
		const controller = getController(encryptUtils, tokenUtils, mockedUserAuthFail.User);

		// act
		await controller.signin(req, res);

		// assert
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(401);
		expect(data.message).to.be.eq('Auth failed');
	});

	it('controller should return status 400 when signing in', async () => {
		// arrage
		const mockedUserUserThrow = {User: {findOne: async () => {throw new Error(errormsg);} }};
		const controller = getController(encryptUtils, tokenUtils, mockedUserUserThrow.User);

		// act
		await controller.signin(req, res);

		// assert
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(400);
		expect(data.message).to.be.eq(errormsg);
	});

	it('controller should return status 404 when getting user', async () => {
		// arrange
		const mockedUserNotFound = {User: {findOne: async () => {}}};
		const controller = getController(encryptUtils, tokenUtils, mockedUserNotFound.User);

		// act
		await controller.get(req, res);

		// arrange
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(404);
		expect(data.message).to.be.eq('No such user');
	});

	it('controller should return 200 when getting user', async () => {
		// arrange
		const user = {
			name: req.body.name,
			email: req.body.email,
		};
		const mockedUserFound = {User: {findOne: async (obj) => Object.assign({}, obj.where, user)}};
		const controller = getController(encryptUtils, tokenUtils, mockedUserFound.User);

		// act
		await controller.get(req, res);

		// assert
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(200);
		expect(data.user).to.be.eql(user);
	});

	it('controller should return 400 when getting user', async () => {
		// arrange
		const mockedUserThrow = {User: {findOne: async () => {throw new Error(errormsg);}}};
		const controller = getController(encryptUtils, tokenUtils, mockedUserThrow.User);

		//act
		await controller.get(req, res);

		// assert
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(400);
		expect(data.message).to.be.eq(errormsg);
	});
});
