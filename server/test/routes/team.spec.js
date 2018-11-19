const request = require('supertest');
const { expect } = require('chai');

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
        fullName: 'nameTest',
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
describe('POST /team', () => {
    before((done) => {
        Promise.all([Team.deleteMany({}), User.deleteMany({})]).then(async () => {
            try {
                userAdmin = await UserController.signUp(userData.userAdmin);
                tokenAdmin = (await UserController.login(userData.userAdmin.email, userData.userAdmin.password)).token;
                userNotAdmin = await UserController.signUp(userData.userNotAdmin);
                tokenNotAdmin = (await UserController.login(userData.userNotAdmin.email, userData.userNotAdmin.password)).token;
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
describe('POST /team/:id/members', () => {
    it('should return 401 OK', (done) => {
        request(app)
            .post(`/teams/${newTeam.id}/members`)
            .send({ username: userNotAdmin.username })
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongData = { username: '' };
        request(app)
            .post(`/teams/${newTeam.id}/members`)
            .send(wrongData)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/teams/${newTeam.id}/members`)
            .send({ username: userNotAdmin.username })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .post('/teams/unknown/members')
            .send({ username: userNotAdmin.username })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post(`/teams/${newTeam.id}/members`)
            .send({ username: userNotAdmin.username })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
});
describe('PUT /teams/:id/members/:id', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .put(`/teams/${newTeam.id}/members/test`)
            .send({ canEdit: true })
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .put(`/teams/${newTeam.id}/members/${userAdmin._id}`)
            .send({ canEdit: true })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongAccessRight = {
            canEdit: 'unknown'
        };
        request(app)
            .put(`/teams/${newTeam.id}/members/${userNotAdmin._id}`)
            .send(wrongAccessRight)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 404 OK', (done) => {
        request(app)
            .put('/teams/test1234/members/test')
            .send({ canEdit: true })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .put(`/teams/${newTeam.id}/members/${userNotAdmin._id}`)
            .send({ canEdit: true })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});
describe('DELETE /teams/:id/members/:id', () => {
    before((done) => {
        TeamController.putMemberAccess(newTeam.id, userAdmin._id, userNotAdmin._id, false).then(done());
    });
    it('should return 401 ERROR', (done) => {
        request(app)
            .delete(`/teams/${newTeam.id}/members/${userNotAdmin._id}`)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .delete(`/teams/${newTeam.id}/members/${userAdmin._id}`)
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .delete(`/teams/${newTeam.id}/members/unknown`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .delete(`/teams/${newTeam.id}/members/${userNotAdmin._id}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});
describe('PUT /teams/:id/name', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .put(`/teams/${newTeam.id}/name`)
            .send({ name: 'test' })
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .put(`/teams/${newTeam.id}/name`)
            .send({ name: 'test' })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongData = {
            name: '',
        };
        request(app)
            .put(`/teams/${newTeam.id}/name`)
            .send(wrongData)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 404 OK', (done) => {
        request(app)
            .put('/teams/test1234/name')
            .send({ name: 'test' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .put(`/teams/${newTeam.id}/name`)
            .send({ name: 'test' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});
describe('PUT /teams/:id/description', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .put(`/teams/${newTeam.id}/description`)
            .send({ description: 'test' })
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .put(`/teams/${newTeam.id}/description`)
            .send({ description: 'test' })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    // it('should return 422 ERROR', (done) => {
    //     const wrongData = {
    //         description: '',
    //     };
    //     request(app)
    //         .put(`/teams/${newTeam.id}/description`)
    //         .send(wrongData)
    //         .set('Authorization', `Bearer ${tokenAdmin}`)
    //         .expect('Content-Type', /json/)
    //         .expect(422, done);
    // });
    it('should return 404 OK', (done) => {
        request(app)
            .put('/teams/test1234/description')
            .send({ description: 'test' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .put(`/teams/${newTeam.id}/description`)
            .send({ description: 'test' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});
describe('PUT /teams/:id/visibility', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .put(`/teams/${newTeam.id}/visibility`)
            .send({ name: 'test', description: '' })
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .put(`/teams/${newTeam.id}/visibility`)
            .send({ name: 'test', description: '' })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongData = {
            isVisible: 'test',
        };
        request(app)
            .put(`/teams/${newTeam.id}/visibility`)
            .send(wrongData)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 404 OK', (done) => {
        request(app)
            .put('/teams/test1234/visibility')
            .send({ isVisible: !newTeam.isVisible })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .put(`/teams/${newTeam.id}/visibility`)
            .send({ isVisible: !newTeam.isVisible })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
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
            .expect(403, (done));
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
