const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');

const data = {
    description: 'this is a valid description'
};

describe('PUT /cards/:id/description', () => {
    it('should return 422 ERROR', (done) => {
        const wrongDescription = {
            description: 42
        };
        request(app)
            .put(`/cards/${data.id}/description`)
            .send(wrongDescription)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    /* TODO: need /POST route before and test on the id provided. 
    it('should return 204 OK', (done) => {
        request(app)
            .put(`/cards/${data.id}/description`)
            .send(data)
            .expect(204, done);
    });
    */
});
