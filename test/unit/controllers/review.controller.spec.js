const { expect } = require('chai');
const httpMock = require('node-mocks-http');

const getController = require('../../../server/controllers/review-controller');

describe('Review controller tests:', () => {
	let req,
		res,
		Op;
  
	const user = {
		name: 'test',
		id: 'test'
	};
  
	const errormsg = 'test error';

	beforeEach(()=>{
		req = httpMock.createRequest({
			method: 'POST',
			body: {
				title: 'test',
				content: 'test',
				category: 'test',
				user: user.name
			},
			params: {
				title: 'test'
			}
		});

		res = httpMock.createResponse();
		Op = {
			like: {}
		};
	});

	it('controller should return 201 when creating review', async () => {
		// arrange
		const mockedUser = {User: {findOne: async (obj) => Object.assign({}, obj.where, {id: user.id})}};
		const mockedReview = {Review: {create: async (obj) => obj}};
		const controller = getController(mockedUser.User, mockedReview.Review, Op);
		const review = {
			title: req.body.title,
			content: req.body.content,
			category: req.body.category,
			user_id: user.id
		};
    
		// act
		await controller.create(req, res);
    
		// assert
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(201);
		expect(data.review).to.be.eql(review);
	});
  
	it('controller should return 400 when creating review', async () => {
		// arrange
		const mockedUserThrow = {User: {findOne: async () => {throw new Error(errormsg);}}};
		const mockedReview = {Review: {}};
		const controller = getController(mockedUserThrow.User, mockedReview.Review, Op);

		// act
		await controller.create(req, res);

		// assert
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(400);
		expect(data.message).to.be.eq(errormsg);
	});
  
	it('controller should return 200 when getting review', async () => {
		// arrange
		const mockedUser = {};
		const mockedReview = {Review: {findOne: async () => {}}};
		const controller = getController(mockedUser, mockedReview.Review, Op);

		// act
		await controller.get(req, res);

		// assert
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(200);
		expect(data).to.be.eql({});
	});
  
	it('controller should return 400 when getting review', async () => {
		// arrange
		const mockedUser = {};
		const mockedReviewThrows = {Review: {findOne: async () => {throw new Error(errormsg);}}};
		const controller = getController(mockedUser, mockedReviewThrows.Review, Op);

		// act
		await controller.get(req, res);

		// assert
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(400);
		expect(data.message).to.be.eq(errormsg);
	});
  
	it('controller should return 200 when searching for reviews', async () => {
		// arrange
		const mockedUser = {};
		const mockedReviewFound = {Review: {findAll: async () => []}};
		const controller = getController(mockedUser, mockedReviewFound.Review, Op);

		// act
		await controller.search(req, res);

		// assert
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(200);
		expect(data.reviews).to.be.eql([]);
	});
  
	it('controller should return 400 when searching for reviews', async () => {
		// arrange
		const mockedUser = {};
		const mockedReviewThrow = {Review: {findAll: async () => {throw new Error(errormsg);}}};
		const controller = getController(mockedUser, mockedReviewThrow.Review, Op);

		// act
		await controller.search(req, res);

		// assert
		const data = JSON.parse(res._getData());
		expect(res.statusCode).to.be.eq(400);
		expect(data.message).to.be.eq(errormsg);
	});
});
