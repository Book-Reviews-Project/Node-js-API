module.exports = (User, Review, Op) => {
	return{
		async create(req, res) {
			try{
				const user = await User.findOne({where: {name: req.body.user}});
				const review = await Review.create({
					title: req.body.title,
					content: req.body.content,
					category: req.body.category,
					user_id: user.id});
				
				return res.status(201).json({
					message: 'Review created',
					review: review
				});
			} catch(err) {
				return res.status(400).json({
					message: err.message
				});
			}
		},
		async get(req, res){
			try{
				const review = await Review.findOne({where: {title: req.params.title}});
				return res.status(200).json({
					review: review
				});
			} catch(err) {
				return res.status(400).json({
					message: err.message
				});
			}
		},
		async search(req, res) {
			try{
				const reviews = await Review.findAll({where: {title: {[Op.like]: '%' + req.params.title + '%'}}});
				return res.status(200).json({
					reviews: reviews
				});
			} catch(err) {
				return res.status(400).json({
					message: err.message
				});
			}
		}
	};
};