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

APISocket.removeSubscriptionToCurrentBoard = (callback) => {
    APISocket.socket.removeListener('subscribeToCurrentBoard', callback());
};

export default APISocket;
