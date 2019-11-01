import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserByPeerId } from '../../utils/StoreService';
import { findUserByPeerId } from '../../utils/PeerService';
import { CallStatus as CallStatusActions, Call as CallActions, CalledUser as CalledUserActions, LocalStream as LocalStreamActions } from '../../actions';
import './contactElement.css';

class ContactElement extends Component {
	constructor(props) {
		super(props);
		this.doInitCall = this.doInitCall.bind(this);
		this.doCall = this.doCall.bind(this);
		this.failedCall = this.failedCall.bind(this);
		this.state = {
			peerId: null
		};
	}
	
	doInitCall(e)
	{
		var peerId = this.props.peerConnections[this.props.peerConnections.length - 1];
		this.setState({
			peerId: peerId
		}, () =>
		{
			if(navigator.getUserMedia)
			{
				navigator.getUserMedia({video: true, audio: true}, this.doCall, this.failedCall);
			}
			else if(navigator.webkitGetUserMedia)
			{
				navigator.webkitGetUserMedia({video: true, audio: true}, this.doCall, this.failedCall);
			}
			else if(navigator.mozGetUserMedia)
			{
				navigator.mozGetUserMedia({video: true, audio: true}, this.doCall, this.failedCall);
			}
		});
	}
	
	doCall(stream)
	{
		var call = this.props.peer.peer.call(this.state.peerId, stream);
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
		this.props.dispatch(CallStatusActions.setCallStatus(CallStatusActions.INITIATED));
	}
	
	failedCall(err) {
		  console.log('Failed to get local stream' ,err);
	}
	
	render() {
		var className = "contact-element";
		var callButton = null;
		if(this.props.isOnline == true)
		{
			className += " contact-online";
			callButton = <span className="glyphicon glyphicon-earphone call-btn" onClick={this.doInitCall}></span>
		}
		else
		{
			className += " contact-offline";
		}
		
		
		return (
				<li className={ className }>
					<span>{this.props.email}&nbsp;&nbsp;&nbsp;
						{callButton}
					</span>
				</li>
		);
	}
}

export default connect(state => ({
    peer: state.Peer
})) (ContactElement);