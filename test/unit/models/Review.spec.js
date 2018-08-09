const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const {
	sequelize,
	dataTypes,
	checkModelName,
	checkPropertyExists
} = require('sequelize-test-helpers');

const UserModel = require('../../../server/models/user');
const CommentModel = require('../../../server/models/comment');
const ReviewModel = require('../../../server/models/review');

describe('Review model tests:', () => {
	const User = UserModel(sequelize, dataTypes);
	const Review = ReviewModel(sequelize, dataTypes);
	const Comment = CommentModel(sequelize, dataTypes);
	const user = new User();
	const comment = new Comment();
	const review = new Review();
  
	it('model should have name review', () => {
		checkModelName(review)('review');
	});
  
	context('model should have properties', () => {
		['title', 'content', 'category'].forEach(checkPropertyExists(review));
	});
  
	it('model should belong to User', () => {
		Review.belongsTo(user);
		expect(Review.belongsTo).to.have.been.calledWith(user);
	});

	it('model should have many Comments', () => {
		Review.hasMany(comment);
		expect(Review.hasMany).to.have.been.calledWith(comment);
	});
});
