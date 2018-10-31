const socket = require('socket.io')();

// ===== Controllers
const boardController = require('../controllers/boards');

// ===== Define behaviours
socket.on('connection', (client) => {
    client.on('subscribeToCurrentBoard', async (boardId) => {
        try {
            const boardFound = await boardController.get(boardId);
            client.emit('currentBoard', { board: boardFound });
        } catch (e) {
            client.emit('currentBoard', { error: e.message });
        }
    });
});

socket.listen(process.env.SOCKET_PORT || 9091);

module.exports = socket;
