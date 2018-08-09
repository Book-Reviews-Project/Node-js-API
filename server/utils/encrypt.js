const bcrypt = require('bcrypt');

module.exports = {
	async encrypt(password, saltRounds=10){
		try{
			if(!password){
				const error = new Error('Password must not be empty!');
				throw error;
			}

			const hash = await bcrypt.hash(password, saltRounds);
			return hash;
		} catch(err) {
			throw err;
		}
	},
	async compare(passToCheck, hashedPass){
		try{
			const match = await bcrypt.compare(passToCheck, hashedPass);
			return match;
		} catch(err){
			throw err;
		}
	}
};