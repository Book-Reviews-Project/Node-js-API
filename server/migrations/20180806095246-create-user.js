module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING(30),
				allowNull: false,
				unique: true
			},
			image: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: 'https://i.imgur.com/xGix4Fo.png',
			},
			email: {
				type: Sequelize.STRING(30),
				unique: true
			},
			password: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('users');
	}
};