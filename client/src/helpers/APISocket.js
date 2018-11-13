import io from 'socket.io-client';

// ===================
let instance = null;

class APISocket {
    constructor(boardId, callback) {
        if (instance) {
            return instance;
        }
        if (process.env.REACT_APP_API_HOST === undefined && process.env.ENVIRONMENT !== 'production') {
            throw Error('REACT_APP_API_HOST in .env file not found.');
        }
        this.socket = io.connect(process.env.REACT_APP_API_HOST);
        this.socket.emit('subscribeToBoard', boardId);
        this.socket.on('currentBoard', res => callback(res));
        instance = this;
    }

    removeSubscriptionToCurrentBoard = () => {
        this.socket.emit('unsuscribeFromBoard', () => {});
    };
}

export default (boardId, callback) => new APISocket(boardId, callback);
