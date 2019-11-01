import React, { Component } from 'react';
import { connect } from 'react-redux';
import Ringer from '../ringer/Ringer';
import CallUi from '../callUi/CallUi';
import store from '../../redux/store';
import { findUserByPeerId } from '../../utils/PeerService';
import { Contacts as ContactsActions, Ringing as RingingActions, CallStatus as CallStatusActions, Call as CallActions, CalledUser as CalledUserActions, LocalStream as LocalStreamActions } from '../../actions';

class MainContent extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			peer: null,
			socket: null,
			peerId: null,
			call: null,
			peerListenersAttached: 0,
			socketListenersAttached: 0
		};
		this.onReceiveContact = this.onReceiveContact.bind(this);
		this.onReceiveCall = this.onReceiveCall.bind(this);
		this.onReceiveStream = this.onReceiveStream.bind(this);
	}
	
	componentDidMount() {
		this.unsubscribe = store.subscribe(() => {
			if(store.getState().Peer.peer)
			{
				this.setState({
					peerListenersAttached: this.state.peerListenersAttached+1
				}, () => {
					if(this.state.peerListenersAttached === 1)
					{
						var peer = store.getState().Peer.peer;
						this.setState({
					        peer: peer
					    }, () => {
					    	this.state.peer.on('call', this.onReceiveCall);
					    });
					}
				});
			}
			if(store.getState().Socket.socket)
			{
				this.setState({
					socketsListenersAttached: this.state.socketListenersAttached+1
				}, () => {
					if(this.state.socketsListenersAttached === 1)
					{
						var socket = store.getState().Socket.socket;
						this.setState({
							socket: socket
						}, () => {
							this.state.socket.on('contact', this.onReceiveContact);
						});
					}
				});
			}
		});
	}
	
	componentWillUnmount()
	{
		this.unsubscribe();
	}
	
	onReceiveCall(call)
	{
		this.props.dispatch(RingingActions.startRinging());
		this.setState({
			peerId: call.peer,
			call: call
		}, () => {
			if(navigator.getUserMedia)
			{
				navigator.getUserMedia({video: true, audio: true}, this.onReceiveStream, this.failedCall);
			}
			else if(navigator.webkitGetUserMedia)
			{
				navigator.webkitGetUserMedia({video: true, audio: true}, this.onReceiveStream, this.failedCall);
			}
			else if(navigator.mozGetUserMedia)
			{
				navigator.mozGetUserMedia({video: true, audio: true}, this.onReceiveStream, this.failedCall);
			}
		});
	}
	
	onReceiveStream(stream)
	{
		var call = this.state.call;
		findUserByPeerId(this.state.peerId).then((response) => {
			var data = response.data;
			if(data.success === true)
			{
				var calledUser = data.user;
				this.props.dispatch(CalledUserActions.setCalledUser(calledUser));
			}
		});
		this.props.dispatch(CallActions.setCall(call));
		this.props.dispatch(LocalStreamActions.setLocalStream(stream));
		if(this.props.callStatus.callStatus !== CallStatusActions.ANSWERED)
		{
			this.props.dispatch(CallStatusActions.setCallStatus(CallStatusActions.RECEIVED));
		}
	}
	
	failedCall(err) {
		  console.log('Failed to get local stream' ,err);
	}
	
	onReceiveContact(data)
	{
		if(data.email !== this.props.authUser.authUser.email)
		{
			var activePeerConnections = [];
			for(var j = 0; j < data.activePeerConnections.length; j++)
			{
				activePeerConnections.push(data.activePeerConnections[j].peerId);
			}
		
			var fmtUser = {
					activePeerConnections: activePeerConnections,
					email: data.email,
					isOnline: data.isOnline
			};
		
			this.props.dispatch(ContactsActions.pushContact(fmtUser));
		}
	}
	
	render() {
		var callUi = null;
		if((this.props.callStatus.callStatus === CallStatusActions.INITIATED || this.props.callStatus.callStatus === CallStatusActions.RECEIVED || this.props.callStatus.callStatus === CallStatusActions.ANSWERED || this.props.callStatus.callStatus === CallStatusActions.ENDED) &&  this.props.call.call !== null)
		{
			callUi = <CallUi />
		}
		return (
				<div className="col-sm-9 col-sm-offset-3 col-md-9 col-md-offset-3 main">
					<Ringer src="ringer.mp3" playStatus={this.props.ringing.ringing}/>
					{callUi}
				</div>
		);
	}
}

export default connect(state => ({
    authUser: state.AuthUser,
    ringing: state.Ringing,
    callStatus: state.CallStatus,
    call: state.Call
})) (MainContent);