const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');
const Board = require('../../models/Board');

const data = {
    name: 'test Card',
    visibility: 'private'
};
describe('POST /boards', () => {
    before(async () => {
        await Board.deleteMany({});
    });
    it('should return 422 ERROR', (done) => {
        const wrongBoard = {
            name: '',
            visibility: 'private'
        };
        request(app)
            .post('/boards')
            .send(wrongBoard)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 200 OK', (done) => {
        request(app)
            .post('/boards')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
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
describe('PUT /board/:id/visibility', () => {
    it('should return 422 ERROR', (done) => {
        const wrongLists = {
            visibility: 'unknown'
        };
        request(app)
            .put(`/board/${data.id}/visibility`)
            .send(wrongLists)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 200 OK', (done) => {
        request(app)
            .put(`/board/${data.id}/visibility`)
            .send({ visibility: 'public' })
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
