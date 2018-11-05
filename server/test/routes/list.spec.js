const request = require('supertest');
const app = require('../../app.js');
const Board = require('../../models/Board');
const Card = require('../../models/Card');
const User = require('../../models/User');
const List = require('../../models/List');
const boardController = require('../../controllers/boards');
const userController = require('../../controllers/users');
const listController = require('../../controllers/lists');

const cardData = {
    name: 'test',
};
const listData = {
    name: 'test',
    id: ''
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
describe('POST /lists/:id/cards', () => {
    before((done) => {
        Promise.all([Card.deleteMany({}), Board.deleteMany({}), User.deleteMany({}), List.deleteMany({})]).then(async () => {
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
                done();
            } catch (e) {
                console.log('Error happened : ', e);
                process.exit(-1);
            }
        });
    });

    it('should return 401 ERROR', (done) => {
        request(app)
            .post(`/lists/${listData.id}/cards`)
            .send(cardData)
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/lists/${listData.id}/cards`)
            .send(cardData)
            .set('Authorization', `Bearer ${tokenNotMember}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongCard = {
            name: ''
        };
        request(app)
            .post(`/lists/${listData.id}/cards`)
            .send(wrongCard)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .post('/lists/unknown/cards')
            .send(cardData)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post(`/lists/${listData.id}/cards`)
            .send(cardData)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
});