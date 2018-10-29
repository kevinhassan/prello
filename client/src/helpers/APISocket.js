import openSocket from 'socket.io-client';

// ===================

const APISocket = {};
APISocket.socket = openSocket(process.env.REACT_APP_SOCKET_API_HOST);

APISocket.subscribeToBoard = (boardId, callback) => {
    APISocket.socket.on('currentBoard', (board) => {
        callback(null, board);
    });
    APISocket.socket.emit('subscribeToCurrentBoard', boardId);
};

export default APISocket;
