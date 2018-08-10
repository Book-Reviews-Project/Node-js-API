const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const {
	sequelize,
	dataTypes,
	checkModelName,
	checkUniqueIndex,
	checkPropertyExists
} = require('sequelize-test-helpers');

const UserModel = require('../../../server/models/user');
const CommentModel = require('../../../server/models/comment');
const ReviewModel = require('../../../server/models/review');

describe('Comment model tests:', () => {
	const User = UserModel(sequelize, dataTypes);
	const Review = ReviewModel(sequelize, dataTypes);
	const Comment = CommentModel(sequelize, dataTypes);
	const user = new User();
	const comment = new Comment();
	const review = new Review();
  
	it('model should have name comment', () => {
		checkModelName(comment)('comment');
	});
  
	context('model should have properties', () => {
		['content'].forEach(checkPropertyExists(comment));
	});
  
	it('model should belong to User', () => {
		Comment.belongsTo(user);
		expect(Comment.belongsTo).to.have.been.calledWith(user);
	});
	it('model should belong to Review', () => {
		Comment.belongsTo(review);
		expect(Comment.belongsTo).to.have.been.calledWith(review);
	});

});