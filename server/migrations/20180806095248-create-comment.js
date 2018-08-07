module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('comments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			content: {
				type: Sequelize.TEXT,
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
			review_id: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'reviews',
					key: 'id',
				}
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
		return queryInterface.dropTable('comments');
	}
};