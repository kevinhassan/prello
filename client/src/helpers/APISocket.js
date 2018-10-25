import openSocket from 'socket.io-client';

// ===================

const APISocket = openSocket(process.env.API_HOST);

export default APISocket;
