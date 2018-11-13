const socketIo = require('socket.io');
const boardController = require('../controllers/boards');
const logger = require('../util/logger');

let io = null;

exports.io = () => io;

exports.initialize = (server) => {
    io = socketIo(server);

    // Set up socket
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
};


/**
 * Send the board to all the clients connected to it
 * @param {String} boardId
 */
module.exports.updateClientsOnBoard = async (boardId) => {
    const newBoard = await boardController.getBoard(boardId);
    io.to(newBoard._id).emit('currentBoard', { board: newBoard });
};
