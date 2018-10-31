const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');
const Board = require('../../models/Board');
const User = require('../../models/User');
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
        fullname: 'nameTest',
        email: 'test@test.fr',
        password: 'passTest',
        username: 'username',
        bio: 'bio'
    },
    userNotAdmin: {
        fullname: 'nameTest',
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
                userAdmin = new User(userData.userAdmin);
                userNotAdmin = new User(userData.userNotAdmin);

                // the owner of the team won't be the owner of the board (for tests)
                dataTeam.members.push({ _id: userNotAdmin._id });
                userAdmin.save().then(() => {
                    request(app)
                        .post('/login')
                        .send({ email: userData.userAdmin.email, password: userData.userAdmin.password })
                        .expect('Content-Type', /json/)
                        .expect(200, (err, res) => {
                            tokenAdmin = res.body.token;
                            userNotAdmin.save().then(() => {
                                request(app)
                                    .post('/login')
                                    .send({ email: userData.userNotAdmin.email, password: userData.userNotAdmin.password })
                                    .expect('Content-Type', /json/)
                                    .expect(200, (err, res) => {
                                        tokenNotAdmin = res.body.token;
                                        done();
                                    });
                            });
                        });
                });
                // create the team and add the admin
                team = new Team();
                team.name = dataTeam.name;
                team.members = dataTeam.members;
                team.save();
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
    it('should return 404 OK', (done) => {
        request(app)
            .get('/boards/test1234')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

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
        const wrongLists = {
            visibility: 'unknown'
        };
        request(app)
            .put(`/boards/${data.id}/visibility`)
            .send(wrongLists)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .put(`/boards/${data.id}/visibility`)
            .send({ visibility: 'public' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });

    it('should return 403 ERROR', (done) => {
        request(app)
            .put(`/boards/${data.id}/visibility`)
            .send({ visibility: 'public' })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
});

describe('POST /board/:id/members', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .post(`/board/${data.id}/members`)
            .send({ email: 'test2@test.fr' })
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/board/${data.id}/members`)
            .send({ email: 'test2@test.fr' })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        request(app)
            .post(`/board/${data.id}/members`)
            .send({ email: '' })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(422, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/board/${data.id}/members`)
            .send({ email: 'unknown@test.fr' })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post(`/board/${data.id}/members`)
            .send({ email: userData.userNotAdmin.email })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(201, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .post(`/board/${data.id}/members`)
            .send({ email: 'unknown@test.fr' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });
});

describe('DELETE /board/:id/members/:id', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .delete(`/board/${data.id}/members/${userNotAdmin._id}`)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .delete(`/board/${data.id}/members/${userAdmin._id}`)
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .delete(`/board/${data.id}/members/unknown`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .delete(`/board/${data.id}/members/${userNotAdmin._id}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});
describe('POST /board/:id/teams', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .post(`/board/${data.id}/teams`)
            .send({ team: team._id })
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/board/${data.id}/teams/`)
            .send({ team: team._id })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        request(app)
            .post(`/board/${data.id}/teams`)
            .send({ team: '' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(422, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .post(`/board/${data.id}/teams`)
            .send({ team: 'unkwown' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .post(`/board/${data.id}/teams`)
            .send({ team: team._id })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});
describe('DELETE /board/:id/teams/:id', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .delete(`/board/${data.id}/teams/${team._id}`)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .delete(`/board/${data.id}/teams/${team._id}`)
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .delete(`/board/${data.id}/teams/unknown`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .delete(`/board/${data.id}/teams/${team._id}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});
