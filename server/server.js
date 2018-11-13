const chalk = require('chalk');
// =====
const logger = require('./util/logger');
// ===== Controllers
const boardController = require('./controllers/boards');

/* eslint-disable import/order */
const app = require('./app');
const server = require('http').Server(app);
const io = require('socket.io')(server);
/* eslint-enable import/order */


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

server.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

module.exports.io = io;
