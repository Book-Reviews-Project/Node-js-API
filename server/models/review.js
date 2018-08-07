const categories = require('./enums/category_enum');

module.exports = (sequelize, DataTypes) => {
	let review = sequelize.define('review', {
		title: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		category: {
			type: DataTypes.ENUM(categories),
			allowNull: false,
		}
	}, {});
	review.associate = function(models) {
		// associations can be defined here
		review.belongsTo(models.user, {foreignKey: 'user_id', onDelete: 'CASCADE'});
		review.hasMany(models.comment, {foreignKey: 'review_id'});
	};
	return review;
};