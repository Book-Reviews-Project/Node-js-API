module.exports = (sequelize, DataTypes) => {
	let comment = sequelize.define('comment', {
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {});
	comment.associate = function(models) {
		// associations can be defined here
		comment.belongsTo(models.user, {foreingKey: 'user_id', onDelete: 'CASCADE'});
		comment.belongsTo(models.review, {foreingKey: 'review_id', onDelete: 'CASCADE'});
	};
	return comment;
};