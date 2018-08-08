const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models').user;
const createToken = require('../utils/tokens').createToken;

module.exports = {
	async create(req, res) {
		try {
			const hash = await bcrypt.hash(req.body.password, saltRounds);
			const user = await User.create({name: req.body.name, password: hash, email: req.body.email});
			const token = await createToken({
				name: user.name,
				email: user.email
			},
			process.env.TOKEN_KEY,
			{
				expiresIn: '1h'
			});
			return res.status(201).json({
				message: 'user created',
				token: token,
				user: {
					name: user.name,
					image: user.image,
					email: user.email,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt
				}
			});

		} catch(err) {
			return res.status(400).json({
				message: err.message
			});
		}
	},
	async signin(req, res) {
		try {
			const user = await User.findOne({where: {email: req.body.email}});
      
			if(!user){
				return res.status(401).json({
					message: 'Auth failed'
				});
			}

			const match = await bcrypt.compare(req.body.password, user.password);

			if(match) {
				const token = await createToken({
					name: user.name,
					email: user.email
				},
				process.env.TOKEN_KEY,
				{
					expiresIn: '1h'
				});
				return res.status(202).json({
					message: 'Auth successful',
					token: token,
					user: {
						name: user.name,
						image: user.image,
						email: user.email,
						createdAt: user.createdAt,
						updatedAt: user.updatedAt
					}
				});
			} else {
				return res.status(401).json({
					message: 'Auth failed'
				});
			}
		} catch (err) {
			return res.status(400).json({
				message: err.message
			});
		}
	},
	async get(req, res) {
		try{
			const user = await User.findOne({where: {name: req.params.name}});

			if(!user) {
				return res.status(404).json({
					messgae: 'No such user'
				});
			}

			return res.status(200).json({
				user: {
					name: user.name,
					image: user.image,
					email: user.email,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt
				}
			});
		} catch (err) {
			return res.status(400).json({
				message: err.message
			});
		}
	},
};