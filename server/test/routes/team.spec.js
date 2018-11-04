const request = require('supertest');
const { expect, assert } = require('chai');

const app = require('../../app.js');
const Team = require('../../models/Team');
const User = require('../../models/User');
const UserController = require('../../controllers/users');

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
        bio: 'bio'
    },
    userNotAdmin: {
        fullName: 'nameTest',
        email: 'test2@test.fr',
        password: 'passTest',
        username: 'username2',
        bio: 'bio'
    }
};
let userAdmin;
let userNotAdmin;
let tokenAdmin;
let tokenNotAdmin;
describe('POST /team', () => {
    before((done) => {
        Promise.all([Team.deleteMany({}), User.deleteMany({})]).then(async () => {
            try {
                userAdmin = await UserController.postRegister(userData.userAdmin);
                tokenAdmin = await UserController.login(userData.userAdmin.email, userData.userAdmin.password);
                userNotAdmin = await UserController.postRegister(userData.userNotAdmin);
                tokenNotAdmin = await UserController.login(userData.userNotAdmin.email, userData.userNotAdmin.password);
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
            .send(newTeam)
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongData = { name: '', isVisible: 'test' };
        request(app)
            .post('/teams')
            .send(wrongData)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post('/teams')
            .send(newTeam)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.team).to.not.be.undefined;
                newTeam.id = res.body.team._id;
                done();
            });
    });
});
describe('POST /team', () => {
    it('should return 401 OK', (done) => {
        request(app)
            .post(`/teams/${newTeam.id}`)
            .send({ email: userNotAdmin.email })
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongData = { email: '' };
        request(app)
            .post(`/teams/${newTeam.id}`)
            .send(wrongData)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/teams/${newTeam.id}`)
            .send({ email: userNotAdmin.email })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .post('/teams/unknown')
            .send({ email: userNotAdmin.email })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post(`/teams/${newTeam.id}`)
            .send({ email: userNotAdmin.email })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
});
describe('DELETE /team/:id', () => {
    it('should return 401 OK', (done) => {
        request(app)
            .delete(`/teams/${newTeam.id}`)
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .delete(`/teams/${newTeam.id}`)
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .delete('/teams/unknown')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .delete(`/teams/${newTeam.id}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});
