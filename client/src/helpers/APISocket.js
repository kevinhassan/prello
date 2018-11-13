import io from 'socket.io-client';

// ===================
let instance = null;

class APISocket {
    constructor() {
        if (instance) {
            return instance;
        }
        if (process.env.REACT_APP_API_HOST === undefined && process.env.ENVIRONMENT !== 'production') {
            console.log(process.env);
            throw Error('REACT_APP_API_HOST in .env file not found.');
        }
        this.socket = io.connect(process.env.REACT_APP_API_HOST);
        instance = this;
    }

    subscribeToBoard = (boardId, callback) => {
        this.socket.emit('subscribeToBoard', {
            boardId,
            Authorization: `Bearer ${localStorage.getItem('prello_token')}`,
        });
        this.socket.on('currentBoard', res => callback(res));
    }

    removeSubscriptionToCurrentBoard = () => {
        this.socket.emit('unsuscribeFromBoard', () => {});
    };
}

export default new APISocket();
