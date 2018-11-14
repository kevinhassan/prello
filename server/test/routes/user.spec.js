/* eslint-disable prefer-destructuring */
const request = require('supertest');
const { expect, assert } = require('chai');

const app = require('../../app.js');
const User = require('../../models/User');

const data = {
    fullName: 'nameTest',
    email: 'test@test.fr',
    password: 'passTest',
    biography: 'biography'
};

describe('POST /register', () => {
    before(async () => {
        await User.deleteMany({});
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post('/register')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
    it('should return 409 ERROR', (done) => {
        request(app)
            .post('/register')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(409, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongData = { email: '', password: data.password, fullName: data.fullName };
        request(app)
            .post('/register')
            .send(wrongData)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
});
describe('POST /login', () => {
    it('should return 200 OK', (done) => {
        request(app)
            .post('/login')
            .send({ email: data.email, password: data.password })
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                expect(res.body.token).to.not.be.undefined;
                done();
            });
    });

    it('should return 422 ERROR', (done) => {
        request(app)
            .post('/login')
            .send({ email: '', password: data.password })
            .expect('Content-Type', /json/)
            .expect(422, done);
    });

    it('should return 403 ERROR', (done) => {
        request(app)
            .post('/login')
            .send({ email: 'unknown@test.fr', password: data.password })
            .expect('Content-Type', /json/)
            .expect(403, done);
    });

    it('should return 403 ERROR', (done) => {
        request(app)
            .post('/login')
            .send({ email: data.email, password: 'wrongpassword' })
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
});
describe('GET /profile', () => {
    let token = null;

    before((done) => {
        request(app)
            .post('/login')
            .send({ email: data.email, password: data.password })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    it('should return 401 ERROR', (done) => {
        request(app)
            .get('/profile')
            .expect(401, done);
    });
    it('should return 200 OK', (done) => {
        request(app)
            .get('/profile')
            .set('Authorization', `Bearer ${token}`)
            .expect(200, (err, res) => {
                assert(res.body.profile.fullName, data.fullName);
                assert(res.body.profile.biography, data.biography);
                expect(res.body.profile.initials).to.not.be.empty;
                expect(res.body.profile.username).to.not.be.empty;
                // add processed data
                data.username = res.body.profile.username;
                data.initials = res.body.profile.initials;
                done();
            });
    });
});
describe('PUT /profile', () => {
    let token = null;

    before((done) => {
        request(app)
            .post('/login')
            .send({ email: data.email, password: data.password })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    it('should return 401 ERROR', (done) => {
        request(app)
            .put('/profile')
            .send(data)
            .expect(401, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongData = data;
        wrongData.fullName = '';
        request(app)
            .put('/profile')
            .set('Authorization', `Bearer ${token}`)
            .send(wrongData)
            .expect(422, done);
    });
    it('should return 204 OK', (done) => {
        const newData = data;
        newData.fullName = 'test1';
        newData.username = 'test2';
        newData.initials = 'TT';

        request(app)
            .put('/profile')
            .send(newData)
            .set('Authorization', `Bearer ${token}`)
            .expect(204, done);
    });
});
describe('POST /forgot', () => {
    it('should return 404 ERROR', (done) => {
        request(app)
            .post('/forgot')
            .send({ email: 'test1@test.fr' })
            .expect(404, done);
    });
});

describe('GET /users/:userId', () => {
    const newUser = {
        fullName: 'Anthony Test',
        email: 'newUser43@test.fr',
        password: 'passTest',
        biography: 'biography'
    };
    before((done) => {
        request(app)
            .post('/register')
            .send(newUser)
            .end((err, res) => {
                newUser._id = res.body.user._id;
                done();
            });
    });

    it('should return 404 ERROR', (done) => {
        request(app)
            .get('/users/inexistantID123')
            .expect(404, done);
    });
    it('should return 200 OK', (done) => {
        request(app)
            .get(`/users/${newUser._id}`)
            .expect(200, done);
    });
});

describe('GET /account', () => {
    let token = null;

    before((done) => {
        request(app)
            .post('/login')
            .send({ email: data.email, password: data.password })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    it('should return 401 ERROR', (done) => {
        request(app)
            .get('/account')
            .expect(401, done);
    });
    it('should return 200 OK', (done) => {
        request(app)
            .get('/account')
            .set('Authorization', `Bearer ${token}`)
            .expect(200, (err, res) => {
                assert(res.body.user.email, data.email);
                done();
            });
    });
});
describe('PUT /account', () => {
    let token = null;

    before((done) => {
        request(app)
            .post('/login')
            .send({ email: data.email, password: data.password })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    it('should return 401 ERROR', (done) => {
        request(app)
            .put('/account')
            .expect(401, done);
    });
    it('should return 422 ERROR', (done) => {
        request(app)
            .put('/account')
            .set('Authorization', `Bearer ${token}`)
            .send({ email: '', password: data.password })
            .expect(422, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .put('/account')
            .set('Authorization', `Bearer ${token}`)
            .send({ email: 'test1@test.fr', password: data.password })
            .expect(204, done);
    });
});

describe('DELETE /account', () => {
    const newUser = {
        fullName: 'Anthony Test',
        email: 'newUser@test.fr',
        password: 'passTest',
        biography: 'biography'
    };
    let token = null;

    before((done) => {
        request(app)
            .post('/register')
            .send(newUser)
            .end(() => {
                request(app)
                    .post('/login')
                    .send({ email: newUser.email, password: newUser.password })
                    .end((err, res) => {
                        token = res.body.token;

                        request(app)
                            .get('/profile')
                            .set('Authorization', `Bearer ${token}`)
                            .send({ email: newUser.email, password: newUser.password })
                            .end((err, res) => {
                                newUser.username = res.body.profile.username;
                                done();
                            });
                    });
            });
    });
    it('should return 401 ERROR', (done) => {
        request(app)
            .delete('/account')
            .expect(401, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .delete('/account')
            .send({ username: newUser.username })
            .set('Authorization', `Bearer ${token}`)
            .expect(204, done);
    });
    it('should return 401 ERROR', (done) => {
        request(app)
            .delete('/account')
            .send({ username: newUser.username })
            .set('Authorization', `Bearer ${token}`)
            .expect(401, done);
    });
});
