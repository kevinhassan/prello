import io from 'socket.io-client';

// ===================
let instance = null;

export default class APISocket {
    constructor() {
        if (instance) {
            return instance;
        }
        this.socket = io.connect(process.env.REACT_APP_SOCKET_API_HOST);
        instance = this;
    }

    subscribeToBoard = (boardId, callback) => {
        this.socket.emit('subscribeToCurrentBoard', boardId);
        this.socket.on('currentBoard', (res) => {
            callback(res);
        });
    };

    removeSubscriptionToCurrentBoard = () => {
        this.socket.emit('unsuscribeFromCurrentBoard', (res) => {
            console.log(res);
        });
    };
}
