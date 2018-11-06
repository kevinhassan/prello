const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');

const boardController = require('../../controllers/boards');
const listController = require('../../controllers/lists');
const userController = require('../../controllers/users');
const cardController = require('../../controllers/cards');
const Board = require('../../models/Board');
const Card = require('../../models/Card');
const List = require('../../models/List');
const User = require('../../models/User');

const cardData = {
    name: 'test',
    id: ''
};
const listData = {
    name: 'test',
    id: ''
};

const newDescription = {
    description: 'Another valid description',
};
const userData = {
    userMember: {
        fullName: 'nameTest',
        email: 'test@test.fr',
        password: 'passTest',
        username: 'username',
        bio: 'bio'
    },
    userNotMember: {
        fullName: 'nameTest',
        email: 'test2@test.fr',
        password: 'passTest',
        username: 'username2',
        bio: 'bio'
    }
};
let userMember;
let userNotMember;
let tokenMember;
let tokenNotMember;
let user;

const newLabel = {
    name: 'my new label',
    color: '#123456',
};

describe('POST /cards', () => {
    before((done) => {
        Promise.all([Card.deleteMany({}), Board.deleteMany({}), User.deleteMany({}), List.deleteMany({}), Card.deleteMany({})]).then(async () => {
            try {
                userMember = await userController.signUp(userData.userMember);
                userNotMember = await userController.signUp(userData.userNotMember);
                tokenMember = await userController.login(userData.userMember.email,
                    userData.userMember.password);
                tokenNotMember = await userController.login(userData.userNotMember.email,
                    userData.userNotMember.password);

                const board = await boardController.postBoard(userMember._id, { name: 'Test board', visibility: 'public' });
                const list = await listController.createList(board._id, listData.name);
                listData.id = list._id;
                const card = await cardController.createCard(cardData.name, list._id);
                cardData.id = card._id;
                newLabel.boardId = board._id;
                const label = await boardController.postLabel(newLabel);
                newLabel._id = label._id;
                done();
            } catch (e) {
                console.log('Error happened : ', e);
                process.exit(-1);
            }
        });
    });
    it('should return 401 ERROR', (done) => {
        request(app)
            .put(`/cards/${cardData.id}/description`)
            .send(newDescription)
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongDescription = {
            description: 43
        };
        request(app)
            .put(`/cards/${cardData.id}/description`)
            .send(wrongDescription)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .put(`/cards/${cardData.id}/description`)
            .send(newDescription)
            .set('Authorization', `Bearer ${tokenNotMember}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .post('/cards/unknown/description')
            .send(cardData)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .put(`/cards/${cardData.id}/description`)
            .send(newDescription)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect(204, done);
    });
});

describe('POST /cards/:cardId/labels/:labelId', () => {
    it('should return 200 OK', (done) => {
        request(app)
            .post(`/cards/${cardData.id}/labels/${newLabel._id}`)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect(200, done);
    });
    it('should return 422 ERROR', (done) => {
        request(app)
            .post(`/cards/${cardData.id}/labels/123456789123`)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect(200, done);
    });
});

describe('DELETE /cards/:cardId/labels/:labelId', () => {
    it('should return 200 OK', (done) => {
        request(app)
            .post(`/cards/${cardData.id}/labels/${newLabel._id}`)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect(200, done);
    });
    it('should return 422 ERROR', (done) => {
        request(app)
            .post(`/cards/${cardData.id}/labels/123456789123`)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect(200, done);
    });
});
