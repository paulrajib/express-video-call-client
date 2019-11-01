import store from '../redux/store.js';
import { AuthUser as AuthUserActions } from '../actions';
import { AccessToken as AccessTokenActions } from '../actions';
import { Peer as PeerActions } from '../actions';
import { Socket as SocketActions } from '../actions';
export function getAccessToken()
{
	return store.getState().AccessToken.accessToken;
}

export function getAuthUser()
{
	return store.getState().AuthUser.authUser;
}

export function dispatchAuthUser(user)
{
	store.dispatch(AuthUserActions.setAuthUser(user));
}

export function getPeer()
{
	return store.getState().Peer.peer;
}

export function dispatchPeer(peer)
{
	store.dispatch(PeerActions.setPeer(peer));
}

export function getSocket()
{
	return store.getState().Socket.socket;
}

export function dispatchSocket(socket)
{
	store.dispatch(SocketActions.setSocket(socket));
}

export function getUserByPeerId(peerId)
{
	var users = store.getState().Contacts.contacts;
	for(var i = 0; i < users.length; i++)
	{
		var user = users[i];
		var activePeerConnections = user.activePeerConnections;
		for(var j = 0; j < activePeerConnections.length; j++)
		{
			var peerConnection = activePeerConnections[j];
			if(peerConnection === peerId)
			{
				return user;
			}
		}
	}
	return null;
}