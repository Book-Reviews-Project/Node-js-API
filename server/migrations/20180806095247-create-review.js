const categories = require('../models/enums/category_enum');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('reviews', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			content: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			category: {
				type: Sequelize.ENUM(categories),
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			user_id: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'users',
					key: 'id',
				}
			}
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('reviews');
	}
};