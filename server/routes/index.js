const express = require('express');
const socket = require('socket.io')();

const boardController = require('../controllers/board');

// ===== Set up socket
const router = express.Router();


socket.on('connection', (client) => {
    client.on('subscribeToCurrentBoard', async (boardId) => {
        try {
            const boardFound = await boardController.get(boardId);
            client.emit('currentBoard', { board: boardFound });
        } catch (e) {
            client.emit('currentBoard', { err: e.message });
        }
    });
});

socket.listen(process.env.SOCKET_PORT || 9091);

// ===== Set up routes
require('./user')(router);
require('./board')(router);

module.exports = router;
