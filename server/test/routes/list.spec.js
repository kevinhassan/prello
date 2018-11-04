const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app.js');
const Board = require('../../models/Board');
const User = require('../../models/User');
const List = require('../../models/List');
const BoardController = require('../../controllers/boards');
const UserController = require('../../controllers/users');

const testList = {
    name: 'test List',
    isArchived: false,
    cards: [],
};
const userData = {
    fullName: 'nameTest',
    email: 'test@test.fr',
    password: 'passTest',
    bio: 'bio'
};
let user;
describe('POST /lists', () => {
    before((done) => {
        Promise.all([User.deleteMany({}), Board.deleteMany({}), List.deleteMany({})]).then(async () => {
            try {
                user = await UserController.postRegister(userData);
                const boardId = await BoardController.createBoard(user._id, { name: 'testBoard', visibility: 'public' });
                testList.boardId = boardId;
                done();
            } catch (e) {
                console.log('Error happened : ', e);
                process.exit(-1);
            }
        });
    });
    it('should return 422 ERROR', (done) => {
        const wrongList = {
            list: ''
        };
        request(app)
            .post('/lists')
            .send(wrongList)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post('/lists')
            .send(testList)
            .expect(201, done);
    });
});
