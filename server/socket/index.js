const io = require('socket.io')();

// ===== Controllers
const boardController = require('../controllers/boards');

// ===== Define behaviours
io.on('connection', (client) => {
    client.on('subscribeToCurrentBoard', async (boardId) => {
        try {
            const boardFound = await boardController.get(boardId);
            client.emit('currentBoard', { board: boardFound });
        } catch (e) {
            client.emit('currentBoard', { error: e.message });
        }
    });
});
io.listen(process.env.SOCKET_PORT || 9091);

module.exports.updateClientsOnBoard = async (boardId) => {
    try {
        const boardFound = await boardController.get(boardId);
        io.sockets.emit('currentBoard', { board: boardFound });
    } catch (e) {
        io.sockets.emit('currentBoard', { error: e.message });
    }
};

module.exports.io = io;
