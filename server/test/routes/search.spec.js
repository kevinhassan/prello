const request = require('supertest');
const { expect, assert } = require('chai');

const app = require('../../app.js');
const Team = require('../../models/Team');
const User = require('../../models/User');
const UserController = require('../../controllers/users');
const TeamController = require('../../controllers/teams');

const newTeam = {
    name: 'team name',
    isVisible: true,
    id: ''
};

const userData = {
    userAdmin: {
        fullName: 'nameTest',
        email: 'test@test.fr',
        password: 'passTest',
        username: 'username',
        biography: 'biography'
    },
    userNotAdmin: {
        fullName: 'testName',
        email: 'test2@test.fr',
        password: 'passTest',
        username: 'username2',
        biography: 'biography'
    }
};
let userAdmin;
let userNotAdmin;
let tokenAdmin;
let tokenNotAdmin;
describe('GET /searchs/members/', () => {
    before((done) => {
        Promise.all([Team.deleteMany({}), User.deleteMany({})]).then(async () => {
            try {
                userAdmin = await UserController.signUp(userData.userAdmin);
                tokenAdmin = (await UserController.login(userData.userAdmin.email, userData.userAdmin.password)).token;
                userNotAdmin = await UserController.signUp(userData.userNotAdmin);
                tokenNotAdmin = (await UserController.login(userData.userNotAdmin.email, userData.userNotAdmin.password)).token;
                newTeam.id = (await TeamController.postTeam(userAdmin._id, newTeam))._id;
                done();
            } catch (e) {
                console.log('Error happened : ', e);
                process.exit(-1);
            }
        });
    });
    it('should return 401 ERROR', (done) => {
        request(app)
            .get('/search/members')
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 200 OK', (done) => {
        request(app)
            .get(`/search/members?username=${userNotAdmin.username}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                assert.isAbove(res.body.members.length, 0);
                done();
            });
    });
    it('should return 200 OK', (done) => {
        request(app)
            .get(`/search/members?username=${userAdmin.username}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                assert.equal(res.body.members.length, 0);
                done();
            });
    });
    it('should return 200 OK', (done) => {
        request(app)
            .get('/search/members?username=unknown')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                assert.equal(res.body.members.length, 0);
                done();
            });
    });
});
