const request = require('supertest');
const { expect, assert } = require('chai');

const app = require('../../app.js');
const Board = require('../../models/Board');

const data = {
    name: 'test Card',
    visibility: 'private'
};
describe('POST /board', () => {
    before(async () => {
        await Board.deleteMany({});
    });
    it('should return 422 ERROR', (done) => {
        const wrongBoard = {
            name: '',
            visibility: 'private'
        };
        request(app)
            .post('/board')
            .send(wrongBoard)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 200 OK', (done) => {
        request(app)
            .post('/board')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                expect(res.body.board).to.not.be.undefined;
                data.id = res.body.board;
                done();
            });
    });
});

describe('GET /board/:id', () => {
    it('should return 404 OK', (done) => {
        request(app)
            .get('/board/test1234')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 200 OK', (done) => {
        request(app)
            .get(`/board/${data.id}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
describe('PUT /board/:id/lists', () => {
    it('should return 422 ERROR', (done) => {
        const wrongLists = {
            lists: ''
        };
        request(app)
            .put(`/board/${data.id}/lists`)
            .send(wrongLists)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 200 OK', (done) => {
        request(app)
            .put(`/board/${data.id}/lists`)
            .send({ lists: [] })
            .expect(204, done);
    });
});
