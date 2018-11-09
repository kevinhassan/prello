// ===== Controllers
const boardController = require('../controllers/boards');

// Set up socket
module.exports = (server) => {
    /* eslint-disable global-require */
    const socket = require('socket.io')(server);
    /* eslint-enable global-require */

    socket.on('connection', (socket) => {
        console.log('New client');

        socket.on('subscribeToCurrentBoard', async (boardId) => {
            console.log('Client subscribed to board');
            try {
                const boardFound = await boardController.getBoard(boardId);
                socket.emit('currentBoard', { board: boardFound });
            } catch (e) {
                socket.emit('currentBoard', { error: e.message });
            }
        });

        socket.on('unsuscribeFromCurrentBoard', async (callback) => {
            console.log('Client unsuscribing from board...');
            socket.removeListener('subscribeToCurrentBoard', callback);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

/*

module.exports.updateClientsOnBoard = async (boardId) => {
    try {
        const boardFound = await boardController.getBoard(boardId);
        io.sockets.emit('currentBoard', { board: boardFound });
    } catch (e) {
        io.sockets.emit('currentBoard', { error: e.message });
    }
};

io.listen(process.env.SOCKET_PORT || 9091);
*/

// module.exports.io = io;
