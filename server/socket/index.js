const socket = require('socket.io')();

// ===== Controllers
const boardController = require('../controllers/boards');
const cardController = require('../controllers/cards');

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

    client.on('editCardDescription', async (data, callback) => {
        try {
            const card = await cardController.putDescription(data.cardId, data.description);
            const boardFound = await boardController.get(card.list.boardId);
            client.emit('currentBoard', { board: boardFound });
            callback({ message: 'Description updated!' });
        } catch (e) {
            callback({ error: e.message });
        }
    });
});

socket.listen(process.env.SOCKET_PORT || 9091);

module.exports = socket;
