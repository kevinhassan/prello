const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');
const Board = require('../../models/Board');
const User = require('../../models/User');
const userController = require('../../controllers/users');
const Team = require('../../models/Team');

const data = {
    name: 'test Card',
    visibility: 'private',
    id: ''
};
const dataTeam = {
    name: 'Team 1',
    members: []
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
let team;
describe('POST /boards', () => {
    before((done) => {
        Promise.all([Board.deleteMany({}), User.deleteMany({}), Team.deleteMany({})])
            .then(async () => {
                try {
                    userAdmin = await userController.postRegister(userData.userAdmin);
                    userNotAdmin = await userController.postRegister(userData.userNotAdmin);

                    // the owner of the team won't be the owner of the board (for tests)
                    dataTeam.members.push({ _id: userNotAdmin._id });
                    tokenAdmin = await userController.login(userData.userAdmin.email,
                        userData.userAdmin.password);
                    tokenNotAdmin = await userController.login(userData.userNotAdmin.email,
                        userData.userNotAdmin.password);

                    // create the team and add the admin
                    team = new Team();
                    team.name = dataTeam.name;
                    team.members = dataTeam.members;
                    team.save();
                    done();
                } catch (e) {
                    console.log('error happened: ', e);
                    process.exit(-1);
                }
            });
    });
    it('should return 422 ERROR', (done) => {
        const wrongBoard = {
            name: '',
            visibility: 'private'
        };
        request(app)
            .post('/boards')
            .send(wrongBoard)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 401 ERROR', (done) => {
        request(app)
            .post('/boards')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post('/boards')
            .send(data)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.board).to.not.be.undefined;
                data.id = res.body.board;
                done();
            });
    });
});
// TODO: integrate visibility on the GET
describe('GET /boards/:id', () => {
    it('should return 404 OK', (done) => {
        request(app)
            .get('/boards/test1234')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 200 OK', (done) => {
        request(app)
            .get(`/boards/${data.id}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
describe('PUT /boards/:id/lists', () => {
    it('should return 404 OK', (done) => {
        request(app)
            .get('/boards/test1234')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    it('should return 422 ERROR', (done) => {
        const wrongLists = {
            lists: ''
        };
        request(app)
            .put(`/boards/${data.id}/lists`)
            .send(wrongLists)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });

    it('should return 204 OK', (done) => {
        request(app)
            .put(`/boards/${data.id}/lists`)
            .send({ lists: [] })
            .expect(204, done);
    });
});

describe('PUT /boards/:id/visibility', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .put(`/boards/${data.id}/visibility`)
            .send({ visibility: 'public' })
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .put(`/boards/${data.id}/visibility`)
            .send({ visibility: 'public' })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongVisibility = {
            visibility: 'unknown'
        };
        request(app)
            .put(`/boards/${data.id}/visibility`)
            .send(wrongVisibility)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 404 OK', (done) => {
        request(app)
            .put('/boards/test1234/visibility')
            .send({ visibility: 'public' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .put(`/boards/${data.id}/visibility`)
            .send({ visibility: 'public' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});

describe('POST /boards/:id/members', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .post(`/boards/${data.id}/members`)
            .send({ email: 'test2@test.fr' })
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/boards/${data.id}/members`)
            .send({ email: 'test2@test.fr' })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        request(app)
            .post(`/boards/${data.id}/members`)
            .send({ email: '' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(422, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/boards/${data.id}/members`)
            .send({ email: 'unknown@test.fr' })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post(`/boards/${data.id}/members`)
            .send({ email: userData.userNotAdmin.email })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(201, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .post(`/boards/${data.id}/members`)
            .send({ email: 'unknown@test.fr' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });
});
describe('PUT /boards/:id/members/:id', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .put(`/boards/${data.id}/members/test`)
            .send({ isAdmin: false })
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .put(`/boards/${data.id}/members/${userAdmin._id}`)
            .send({ isAdmin: false })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongAccessRight = {
            isAdmin: 'unknown'
        };
        request(app)
            .put(`/boards/${data.id}/members/${userNotAdmin._id}`)
            .send(wrongAccessRight)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 404 OK', (done) => {
        request(app)
            .put('/boards/test1234/members/test')
            .send({ isAdmin: false })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .put(`/boards/${data.id}/members/${userNotAdmin._id}`)
            .send({ isAdmin: false })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});

describe('DELETE /boards/:id/members/:id', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .delete(`/boards/${data.id}/members/${userNotAdmin._id}`)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .delete(`/boards/${data.id}/members/${userAdmin._id}`)
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .delete(`/boards/${data.id}/members/unknown`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .delete(`/boards/${data.id}/members/${userNotAdmin._id}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});
describe('POST /boards/:id/teams', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .post(`/boards/${data.id}/teams`)
            .send({ team: team._id })
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/boards/${data.id}/teams/`)
            .send({ team: team._id })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        request(app)
            .post(`/boards/${data.id}/teams`)
            .send({ team: '' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(422, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .post(`/boards/${data.id}/teams`)
            .send({ team: 'unkwown' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .post(`/boards/${data.id}/teams`)
            .send({ team: team._id })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});
describe('DELETE /boards/:id/teams/:id', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .delete(`/boards/${data.id}/teams/${team._id}`)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .delete(`/boards/${data.id}/teams/${team._id}`)
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .delete(`/boards/${data.id}/teams/unknown`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .delete(`/boards/${data.id}/teams/${team._id}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});
