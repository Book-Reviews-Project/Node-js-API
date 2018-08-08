const jwt = require('jsonwebtoken');

module.exports = {
	async createToken(payload, cert, expiresIn) {
		const token = await jwt.sign(payload, cert, expiresIn);
		return token;
	},
	async validateToken(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1];
			await jwt.verify(token, process.env.TOKEN_KEY);
			next();
		} catch (err) {
			return res.status(401).json({
				message: 'Auth failed'
			});
		}
	}
};