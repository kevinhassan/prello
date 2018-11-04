const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');

const BoardController = require('../../controllers/boards');
const ListController = require('../../controllers/lists');
const UserController = require('../../controllers/users');
const Card = require('../../models/Card');
const Board = require('../../models/Board');
const User = require('../../models/User');
const List = require('../../models/List');

const newCard = {
    name: 'This is a valid description',
};

const newDescription = {
    description: 'Another valid description',
};
const userData = {
    fullName: 'nameTest',
    email: 'test@test.fr',
    password: 'passTest',
    bio: 'bio'
};
let user;
describe('POST /cards', () => {
    before((done) => {
        Promise.all([Card.deleteMany({}), User.deleteMany({}), Board.deleteMany({}), List.deleteMany({})]).then(async () => {
            try {
                user = await UserController.postRegister(userData);
                const boardId = await BoardController.createBoard(user._id, { name: 'Test board', visibility: 'public' });
                const list = await ListController.createList({ name: 'Test List', boardId });
                newCard.list = list._id;
                done();
            } catch (e) {
                console.log('Error happened : ', e);
                process.exit(-1);
            }
        });
    });
    it('should return 422 ERROR', (done) => {
        const wrongCard = {
            name: '',
            list: ''
        };
        request(app)
            .post('/cards')
            .send(wrongCard)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post('/cards')
            .send(newCard)
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.card).to.not.be.undefined;
                newCard.cardId = res.body.card;
                done();
            });
    });
});

describe('PUT /cards/:id/description', () => {
    it('should return 204 OK', (done) => {
        request(app)
            .put(`/cards/${newCard.cardId}/description`)
            .send(newDescription)
            .expect(204, done);
    });

    it('should return 422 ERROR', (done) => {
        const wrongDescription = {
            description: 43
        };
        request(app)
            .put(`/cards/${newCard.cardId}/description`)
            .send(wrongDescription)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
});
