const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app.js');
const Board = require('../../models/Board');
const BoardController = require('../../controllers/boards');

const testList = {
    name: 'test List',
    isArchived: false,
    cards: [],
};

describe('POST /lists', () => {
    before(async () => {
        await Board.deleteMany({});
        const boardId = await BoardController.createBoard({ name: 'testBoard', visibility: 'public' });
        testList.boardId = boardId;
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
