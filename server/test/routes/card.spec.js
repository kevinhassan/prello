const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');
const Card = require('../../models/Card');

const newCard = {
    name: 'this is a valid description',
    list: 'l00000000001'
};

const newDescription = {
    description: 'Another valid description',
};

describe('POST /cards', () => {
    before(async () => {
        await Card.deleteMany({});
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
