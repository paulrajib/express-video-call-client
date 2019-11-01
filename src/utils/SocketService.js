import io from 'socket.io-client';

export function createSocket(peerId) {
	var socket = io('https://localhost:3001');
	socket.on('connect', function (data) {
        socket.emit('storeClientInfo', { customId: peerId });
    });
	return socket;
}