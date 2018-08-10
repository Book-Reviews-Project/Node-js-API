const request = require('supertest');
const { expect } = require('chai');

const url = 'localhost:8000';

describe('User routes tests:', () => {
	const user = {
		name: 'usertest',
		email: 'user@test.test',
		password: 'testtest',
	};
  
	const userAuth = {
		email: 'user@test.test',
		password: 'testtest'
	};
  
	const userAuthWrongPass = {
		email: 'user@test.test',
		password: 'test'
	};

	const userAuthWrongEmail = {
		email: 'user@user.test',
		password: 'testtest'
	};

	it('user/register should return 201 when valid data is passed', (done) => {
		request(url)
			.post('/api/v1/user/register')
			.send(user)
			.expect(201)
			.end((err, res) => {

				if(err){
					throw err;
				}
				
				expect(res.body.token).to.exist;
				expect(res.body.user).to.exist;
				done();
			});
	});
  
	it('user/register should return 400 when invalid data is passed', (done) => {
		request(url)
			.post('/api/v1/user/register')
			.send(user)
			.expect(400)
			.end(done);
	});
  
	it('user/signin should return 202 when valid data is passed', (done) => {
		request(url)
			.post('/api/v1/user/signin')
			.send(userAuth)
			.expect(202)
			.end((err, res) => {

				if(err){
					throw err;
				}
				
				expect(res.body.token).to.exist;
				expect(res.body.user).to.exist;
				done();
			});
	});
  
	it('user/signin should return 401 when wrong password is passed', (done) => {
		request(url)
			.post('/api/v1/user/signin')
			.send(userAuthWrongPass)
			.expect(401)
			.end(done);
	});
  
	it('user/signin should return 401 when email which doesn\'t exist is passed', (done) => {
		request(url)
			.post('/api/v1/user/signin')
			.send(userAuthWrongEmail)
			.expect(401)
			.end(done);
	});
  
	it('user/signin should return 400 when invalid data is passed', (done) => {
		request(url)
			.post('/api/v1/user/signin')
			.send({})
			.expect(401)
			.end(done);
	});
  
	it('user/:name should return 200 when valid param is passed', (done) => {
		request(url)
			.get('/api/v1/user/testtest')
			.expect(200)
			.end((err, res) => {

				if(err){
					throw err;
				}
				
				expect(res.body.user).to.exist;
				done();
			});
	});
  
	it('user/:name should return 404 when user doesn\'t exist', (done) => {
		request(url)
			.get('/api/v1/user/notest')
			.expect(404)
			.end(done);
	});
});
