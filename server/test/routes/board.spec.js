const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');
const Board = require('../../models/Board');
const User = require('../../models/User');

const data = {
    name: 'test Card',
    visibility: 'private',
    id: ''
};
const userData = {
    userOwner: {
        fullname: 'nameTest',
        email: 'test@test.fr',
        password: 'passTest',
        username: 'username',
        bio: 'bio'
    },
    userNotOwner: {
        fullname: 'nameTest',
        email: 'test2@test.fr',
        password: 'passTest',
        username: 'username2',
        bio: 'bio'
    }
};
let userOwner;
let userNotOwner;
let tokenOwner;
let tokenNotOwner;

describe('POST /boards', () => {
    before((done) => {
        Promise.all([Board.deleteMany({}), User.deleteMany({})])
            .then(async () => {
                userOwner = new User(userData.userOwner);
                userNotOwner = new User(userData.userNotOwner);
                userOwner.save().then(() => {
                    request(app)
                        .post('/login')
                        .send({ email: userData.userOwner.email, password: userData.userOwner.password })
                        .expect('Content-Type', /json/)
                        .expect(200, (err, res) => {
                            tokenOwner = res.body.token;
                            userNotOwner.save().then(() => {
                                request(app)
                                    .post('/login')
                                    .send({ email: userData.userNotOwner.email, password: userData.userNotOwner.password })
                                    .expect('Content-Type', /json/)
                                    .expect(200, (err, res) => {
                                        tokenNotOwner = res.body.token;
                                        done();
                                    });
                            });
                        });
                });
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
            .set('Authorization', `Bearer ${tokenOwner}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .post('/boards')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post('/boards')
            .send(data)
            .set('Authorization', `Bearer ${tokenOwner}`)
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.board).to.not.be.undefined;
                data.id = res.body.board;
                done();
            });
    });
});

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

    it('should return 403 ERROR', (done) => {
        request(app)
            .put(`/boards/${data.id}/visibility`)
            .send({ visibility: 'public' })
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .put(`/boards/${data.id}/visibility`)
            .send({ visibility: 'public' })
            .set('Authorization', `Bearer ${tokenNotOwner}`)
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
            .set('Authorization', `Bearer ${tokenOwner}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .put(`/boards/${data.id}/visibility`)
            .send({ visibility: 'public' })
            .set('Authorization', `Bearer ${tokenOwner}`)
            .expect(204, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .put(`/boards/${data.id}/visibility`)
            .send({ visibility: 'public' })
            .set('Authorization', `Bearer ${tokenNotOwner}`)
            .expect(403, done);
    });
});
describe('POST /board/:id/members', () => {
    it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/board/${data.id}/members`)
            .send({ email: 'test2@test.fr' })
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        request(app)
            .post(`/board/${data.id}/members`)
            .send({ email: '' })
            .set('Authorization', `Bearer ${tokenNotOwner}`)
            .expect(422, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .post(`/board/${data.id}/members`)
            .send({ email: 'unknown@test.fr' })
            .set('Authorization', `Bearer ${tokenNotOwner}`)
            .expect(404, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post(`/board/${data.id}/members`)
            .send({ email: 'test2@test.fr' })
            .set('Authorization', `Bearer ${tokenNotOwner}`)
            .expect(201, done);
    });
});
