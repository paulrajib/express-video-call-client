import Peer from 'peerjs';
import { createRandomString } from './UtilService';
import { sendRequest } from './APIService';

export function createPeerObject(id)
{
	var peer = new Peer(id+'_'+createRandomString(20), {host: 'localhost', port: 3002, path: '/'});
	return peer;
}

export function findUserByPeerId(peerId)
{
	return sendRequest('/api/users/get/peerId', 'post', { peerId: peerId });
}