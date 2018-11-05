const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app.js');
const Board = require('../../models/Board');
const User = require('../../models/User');
const List = require('../../models/List');
const boardController = require('../../controllers/boards');
const userController = require('../../controllers/users');

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
