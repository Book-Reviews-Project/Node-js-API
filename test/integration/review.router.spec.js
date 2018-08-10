const request = require('supertest');
const { expect } = require('chai');

const url = 'localhost:8000';

describe('Review routes tests:', () => {
	const review = {
		title: 'test',
		content: 'test',
		category: 'Satire',
		user: 'testtest'
	};

	it('review/create should return status 201 when valid data is passed', (done) => {
		let token;
    
		request(url)
			.post('/api/v1/user/signin')
			.send({email:'test@test.test', password:'testtest'})
			.end((err, res) => {
				token = res.body.token;

				request(url)
					.post('/api/v1/review/create')
					.send(review)
					.set('Authorization', 'Bearer ' + token)
					.expect(201)
					.end((err, res) => {

						if(err){
							throw err;
						}
				
						expect(res.body.review).to.exist;
						done();
					});
			});
	});
  
	it('review/create should return status 400 when invalid data is passed', (done) => {
		let token;
    
		request(url)
			.post('/api/v1/user/signin')
			.send({email:'test@test.test', password:'testtest'})
			.end((err, res) => {
				token = res.body.token;

				request(url)
					.post('/api/v1/review/create')
					.send({})
					.set('Authorization', 'Bearer ' + token)
					.expect(400)
					.end(done);
			});
	});
  
	it('review/create should return status 401 when no token is passed', (done) => {
		request(url)
			.post('/api/v1/review/create')
			.send(review)
			.expect(401)
			.end(done);
	});
  
	it('review/:title should return status 200 when valid param is passed', (done) => {
		request(url)
			.get('/api/v1/review/test')
			.expect(200)
			.end((err, res) => {

				if(err){
					throw err;
				}

				expect(res.body.review).to.exist;
				done();
			});
	});
  
	it('review/search/:query should return status 200 when valid param is passed', (done) => {
		request(url)
			.get('/api/v1/review/search/test')
			.expect(200)
			.end((err, res) => {

				if(err){
					throw err;
				}
				
				expect(res.body.reviews).to.exist;
				done();
			});
	});
});
