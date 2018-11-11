const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');
const Board = require('../../models/Board');
const User = require('../../models/User');
const List = require('../../models/List');
const userController = require('../../controllers/users');
const Team = require('../../models/Team');

const boardData = {
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
        biography: 'biography'
    },
    userNotAdmin: {
        fullName: 'nameTest',
        email: 'test2@test.fr',
        password: 'passTest',
        username: 'username2',
        biography: 'biography'
    },
    userNotMember: {
        fullName: 'nameTest',
        email: 'test3@test.fr',
        password: 'passTest',
        username: 'username3',
        biography: 'biography'
    }
};
const listData = {
    name: 'test',
    id: ''
};

let userAdmin;
let userNotAdmin;
let userNotMember;
let tokenAdmin;
let tokenNotAdmin;
let tokenNotMember;
let team;
describe('POST /boards', () => {
    before((done) => {
        Promise.all([Board.deleteMany({}), User.deleteMany({}), Team.deleteMany({}), List.deleteMany({})])
            .then(async () => {
                try {
                    userAdmin = await userController.signUp(userData.userAdmin);
                    userNotAdmin = await userController.signUp(userData.userNotAdmin);
                    userNotMember = await userController.signUp(userData.userNotMember);

                    // the owner of the team won't be the owner of the board (for tests)
                    dataTeam.members.push({ _id: userNotAdmin._id });
                    tokenAdmin = (await userController.login(userData.userAdmin.email,
                        userData.userAdmin.password)).token;
                    tokenNotAdmin = (await userController.login(userData.userNotAdmin.email,
                        userData.userNotAdmin.password)).token;
                    tokenNotMember = (await userController.login(userData.userNotMember.email,
                        userData.userNotMember.password)).token;

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
            .send(boardData)
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post('/boards')
            .send(boardData)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.board).to.not.be.undefined;
                boardData.id = res.body.board._id;
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
            .get(`/boards/${boardData.id}`)
            .send(boardData)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('PUT /boards/:id/lists', () => {
    it('should return 401 OK', (done) => {
        request(app)
            .put(`/boards/${boardData.id}/lists`)
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 403 OK', (done) => {
        request(app)
            .put(`/boards/${boardData.id}/lists`)
            .set('Authorization', `Bearer ${tokenNotMember}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 404 OK', (done) => {
        request(app)
            .put('/boards/test1234/lists')
            .expect('Content-Type', /json/)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });

    it('should return 422 ERROR', (done) => {
        const wrongLists = {
            lists: ''
        };
        request(app)
            .put(`/boards/${boardData.id}/lists`)
            .send(wrongLists)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });

    it('should return 204 OK', (done) => {
        request(app)
            .put(`/boards/${boardData.id}/lists`)
            .send({ lists: [] })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});

describe('PUT /boards/:id/visibility', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .put(`/boards/${boardData.id}/visibility`)
            .send({ visibility: 'public' })
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .put(`/boards/${boardData.id}/visibility`)
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
            .put(`/boards/${boardData.id}/visibility`)
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
            .put(`/boards/${boardData.id}/visibility`)
            .send({ visibility: 'public' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});

describe('PUT /boards/:id/isArchived', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .put(`/boards/${boardData.id}/isArchived`)
            .send({ isArchived: false })
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .put(`/boards/${boardData.id}/isArchived`)
            .send({ isArchived: false })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        request(app)
            .put(`/boards/${boardData.id}/isArchived`)
            .send({ isArchived: 'somethingWrong' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 404 OK', (done) => {
        request(app)
            .put('/boards/1234BoardId48/isArchived')
            .send({ isArchived: 'somethingWrong' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .put(`/boards/${boardData.id}/isArchived`)
            .send({ isArchived: true })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});

describe('POST /boards/:id/members', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/members`)
            .send({ email: 'test2@test.fr' })
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/members`)
            .send({ email: 'test2@test.fr' })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/members`)
            .send({ email: '' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(422, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/members`)
            .send({ email: 'unknown@test.fr' })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/members`)
            .send({ email: userData.userNotAdmin.email })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(201, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/members`)
            .send({ email: 'unknown@test.fr' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });
});

const newLabel = {
    name: 'myLabel',
    color: '#123456',
};

describe('POST /boards/:boardId/labels', () => {
    it('should return 201 OK', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/labels`)
            .send(newLabel)
            .expect(201, done);
    });
    it('should return 422 ERROR: no color and name provided', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/labels`)
            .send({ name: '' })
            .expect(422, done);
    });
    it('should return 422 ERROR: invalid color', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/labels`)
            .send({ name: 'a random lable', color: '#2y5689' })
            .expect(422, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .post('/boards/b12345678912/labels')
            .send({ name: 'ok', color: '#123456' })
            .expect(404, done);
    });
});

describe('GET /boards/:boardId/labels', () => {
    it('should return 200 OK', (done) => {
        request(app)
            .get(`/boards/${boardData.id}/labels`)
            .expect(200, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .get('/boards/arandomboard/labels')
            .expect(404, done);
    });
});

describe('PUT /boards/:id/members/:id', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .put(`/boards/${boardData.id}/members/test`)
            .send({ isAdmin: false })
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .put(`/boards/${boardData.id}/members/${userAdmin._id}`)
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
            .put(`/boards/${boardData.id}/members/${userNotAdmin._id}`)
            .send(wrongAccessRight)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .put(`/boards/test1234/members/${userNotAdmin._id}`)
            .send({ isAdmin: false })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(404);
        request(app)
            .put(`/boards/${boardData.id}/members/unknown`)
            .send({ isAdmin: false })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .put(`/boards/${boardData.id}/members/${userNotAdmin._id}`)
            .send({ isAdmin: false })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});

describe('DELETE /boards/:id/members/:id', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .delete(`/boards/${boardData.id}/members/${userNotAdmin._id}`)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .delete(`/boards/${boardData.id}/members/${userAdmin._id}`)
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .delete(`/boards/${boardData.id}/members/unknown`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .delete(`/boards/${boardData.id}/members/${userNotAdmin._id}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});
describe('POST /boards/:id/teams', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/teams`)
            .send({ team: team._id })
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/teams/`)
            .send({ team: team._id })
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/teams`)
            .send({ team: '' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(422, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/teams`)
            .send({ team: 'unkwown' })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/teams`)
            .send({ team: team._id })
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});
describe('DELETE /boards/:id/teams/:id', () => {
    it('should return 401 ERROR', (done) => {
        request(app)
            .delete(`/boards/${boardData.id}/teams/${team._id}`)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .delete(`/boards/${boardData.id}/teams/${team._id}`)
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect(403, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .delete(`/boards/${boardData.id}/teams/unknown`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .delete(`/boards/${boardData.id}/teams/${team._id}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(204, done);
    });
});
describe('POST /boards/:id/lists', () => {
    /* it('should return 401 ERROR', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/lists`)
            .send(listData)
            .expect('Content-Type', /json/)
            .expect(401, done);
    }); */
    it('should return 422 ERROR', (done) => {
        const wrongList = {
            name: ''
        };
        request(app)
            .post(`/boards/${boardData.id}/lists`)
            .send(wrongList)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    /* it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/lists`)
            .send(listData)
            .set('Authorization', `Bearer ${tokenNotAdmin}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    }); */
    it('should return 404 ERROR', (done) => {
        request(app)
            .post('/boards/unknown/lists')
            .send(listData)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(404, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post(`/boards/${boardData.id}/lists`)
            .send(listData)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .expect(201, (err, res) => {
                expect(res.body.list).to.not.be.undefined;
                listData.id = res.body.list._id;
                done();
            });
    });
});
