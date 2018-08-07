module.exports = (sequelize, DataTypes) => {
	let user = sequelize.define('user', {
		name: {
			type: DataTypes.STRING(30),
			allowNull: false,
			unique: true
		},
		image: {
			type: DataTypes.STRING,
			validate: {
				isUrl: true
			},
			allowNull: false,
			defaultValue: 'https://i.imgur.com/xGix4Fo.png',
		},
		password: {
			type: DataTypes.STRING(30),
			validate: {
				len: {
					args: [8, 30],
					msg: 'password must be longer than 8 and less than 30!'
				}
			}
		},
		email: {
			type: DataTypes.STRING(30),
			validate: {
				isEmail: true
			},
			unique: true
		}
	}, {});
	user.associate = function(models) {
		// associations can be defined here
		user.hasMany(models.review, {foreignKey: 'user_id', sourceKey: 'id'});
	};
	return user;
};