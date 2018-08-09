const { expect } = require('chai');
const httpMock = require('node-mocks-http');

const getController = require('../../../server/controllers/user-controller');

describe('User controller tests:', async () => {
	let req,
		res,
		tokenUtils,
		encryptUtils,
		mockedUser,
		controller,
		user;

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
			createToken(a, b, c) {
				return 'test';
			}
		};
		encryptUtils = {
			encrypt(a) {
				return 'test';
			}
		};
		mockedUser = {User: {create: (obj) => obj}};
		controller = getController(encryptUtils, tokenUtils, mockedUser.User);
		user = {
			name: req.body.name,
			email: req.body.email,
		};
	});
  
	it('controller should create user', async () => {
		await controller.create(req, res);
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(201);
		expect(data.message).to.be.eq('user created');
		expect(data.token).to.be.eq('test');
		expect(data.user).to.be.eql(user);
	});
});
