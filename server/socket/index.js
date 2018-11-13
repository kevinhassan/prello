const socket = require('../server').io;
const boardController = require('../controllers/boards');
/**
 * Send the board to all the clients connected to it
 * @param {String} boardId
 */
module.exports.updateClientsOnBoard = async (boardId) => {
    console.log(socket);
    const newBoard = await boardController.getBoard(boardId);
    socket.to(newBoard._id).emit('currentBoard', { board: newBoard });
};
