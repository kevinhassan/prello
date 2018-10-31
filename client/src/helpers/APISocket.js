import openSocket from 'socket.io-client';

// ===================

const APISocket = {};
APISocket.socket = openSocket(process.env.REACT_APP_SOCKET_API_HOST);

APISocket.subscribeToBoard = (boardId, callback) => {
    APISocket.socket.on('currentBoard', (res) => {
        callback(res);
    });
    APISocket.socket.emit('subscribeToCurrentBoard', boardId);
};

APISocket.editCardDescription = (cardId, description, callback) => {
    APISocket.socket.emit('editCardDescription', { cardId, description }, (res) => {
        callback(res);
    });
};

export default APISocket;
