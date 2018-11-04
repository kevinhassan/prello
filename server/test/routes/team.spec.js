const request = require('supertest');
const { expect, assert } = require('chai');

const app = require('../../app.js');
const Team = require('../../models/Team');
const User = require('../../models/User');
const UserController = require('../../controllers/users');

const data = {
    name: 'team name',
    isVisible: true
};
const userData = {
    fullName: 'nameTest',
    email: 'test@test.fr',
    password: 'passTest',
    bio: 'bio'
};
let token;
let user;
describe('POST /team', () => {
    before((done) => {
        Promise.all([Team.deleteMany({}), User.deleteMany({})]).then(async () => {
            try {
                user = await UserController.postRegister(userData);
                token = await UserController.login(userData.email, userData.password);
                done();
            } catch (e) {
                console.log('Error happened : ', e);
                process.exit(-1);
            }
        });
    });
    it('should return 401 OK', (done) => {
        request(app)
            .post('/teams')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongData = { name: '', isVisible: 'test' };
        request(app)
            .post('/teams')
            .send(wrongData)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post('/teams')
            .send(data)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
});
