import React, { Component } from 'react';
import { sendRequest } from '../utils/APIService';
import { getAccessToken, getAuthUser, dispatchAuthUser, dispatchPeer, dispatchSocket } from '../utils/StoreService';
import { createPeerObject } from '../utils/PeerService';
import { createSocket } from '../utils/SocketService';
import Nav from './nav/Nav';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {
	
	constructor(props) {
		super(props);
		var accessToken = getAccessToken();
		var user = getAuthUser();
		if(user === null && accessToken !== null)
		{
			sendRequest('/api/users/detail', 'get').then((response) => {
				var data = response.data;
				if(data.success === true)
				{
					var user = data.user;
					dispatchAuthUser(user);
					var peer = createPeerObject(user._id);
					dispatchPeer(peer);
					var socket = createSocket(peer.socket.id);
					dispatchSocket(socket);
				}
			});
		}
	}
	
	render() {
		return (
				<div>
					<Nav />
					{this.props.children}
				</div>
		);
	}
}

export default App;