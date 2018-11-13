const logger = require('../util/logger');

// ===== Controllers
const boardController = require('../controllers/boards');

// Set up socket
module.exports.getSocket = (server) => {
    /* eslint-disable global-require */
    const io = require('socket.io')(server);
    /* eslint-enable global-require */

    io.on('connection', (socket) => {
        logger.info('New client');

        socket.on('subscribeToBoard', async (boardId) => {
            logger.info(`Client subscribed to board ${boardId}`);
            socket.join(boardId);
            const boardFound = await boardController.getBoard(boardId);
            io.sockets.connected[socket.id].emit('currentBoard', { board: boardFound });
        });


        socket.on('unsuscribeFromBoard', async (boardId) => {
            logger.info('Client leaving board');
            socket.leave(boardId);
        });

        socket.on('disconnect', () => {
            logger.info('Client disconnected');
        });
    });

    io.updateClientsOnBoard = async (boardId) => {
        const boardFound = await boardController.getBoard(boardId);
        io.emit('currentBoard', { board: boardFound });
    };

    return io;
};
