const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');

const boardController = require('../../controllers/boards');
const listController = require('../../controllers/lists');
const userController = require('../../controllers/users');
const cardController = require('../../controllers/cards');
const Card = require('../../models/Card');
const Board = require('../../models/Board');
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
describe('PUT /cards/:id/description', () => {
    before((done) => {
        Promise.all([Card.deleteMany({}), Board.deleteMany({}), User.deleteMany({}), List.deleteMany({}), Card.deleteMany({})]).then(async () => {
            try {
                userAdmin = await userController.signUp(userData.userAdmin);
                userNotAdmin = await userController.signUp(userData.userNotAdmin);
                tokenAdmin = await userController.login(userData.userAdmin.email,
                    userData.userAdmin.password);
                tokenNotAdmin = await userController.login(userData.userNotAdmin.email,
                    userData.userNotAdmin.password);
                const board = await boardController.postBoard(userAdmin._id, { name: 'Test board', visibility: 'public' });
                const list = await listController.createList(board._id, listData.name);
                listData.id = list._id;
                const card = await cardController.createCard(cardData.name, list._id);
                cardData.id = card._id;
                done();
            } catch (e) {
                console.log('Error happened : ', e);
                process.exit(-1);
            }
        });
    });
    it('should return 422 ERROR', (done) => {
        const wrongDescription = {
            description: 43
        };
        request(app)
            .put(`/cards/${cardData.id}/description`)
            .send(wrongDescription)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 204 OK', (done) => {
        request(app)
            .put(`/cards/${cardData.id}/description`)
            .send(newDescription)
            .expect(204, done);
    });
});
