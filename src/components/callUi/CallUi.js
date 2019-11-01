import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CallStatus as CallStatusActions, LocalStream as LocalStreamActions, RemoteStream as RemoteStreamActions, Call as CallActions } from '../../actions';
import store from '../../redux/store';
import RemoteVideo from './remoteVideo/RemoteVideo';
import RemoteAudio from './remoteAudio/RemoteAudio';
import LocalVideo from './localVideo/LocalVideo';
import CallControlBar from './controls/CallControlBar';
import CallInfo from './info/CallInfo';

class CallUi extends Component {
	constructor(props) {
		super(props);
		this.state = {
			call: null,
			listenersAttached: 0
		}
		this.onReceiveRemoteStream = this.onReceiveRemoteStream.bind(this);
		this.onCallEnded = this.onCallEnded.bind(this);
	};
	
	componentDidMount() {
		this.unsubscribe = store.subscribe(() => {
			if(store.getState().Call.call)
			{
				this.setState({
					listenersAttached: this.state.listenersAttached + 1
				}, ()=> {
					if(this.state.listenersAttached == 1)
					{
						var call = store.getState().Call.call;
						this.setState({
					        call: call
					    }, () => {
					    	this.state.call.on('stream', this.onReceiveRemoteStream);
					    	this.state.call.on('close', this.onCallEnded);
					    	this.state.call.on('error', (err) => {
					    		console.log(err);
					    	});
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
	
	onReceiveRemoteStream(stream)
	{
		this.props.dispatch(CallStatusActions.setCallStatus(CallStatusActions.ANSWERED));
		this.props.dispatch(RemoteStreamActions.setRemoteStream(stream));
	}
	
	onCallEnded()
	{
		this.props.dispatch(CallActions.setCall(null));
		if(this.props.localStream.localStream)
		{
			var localStream = this.props.localStream.localStream;
			var tracks = localStream.getTracks();
			for(var i = 0; i < tracks.length; i++ )
			{
				tracks[i].stop();
			}
		}
		this.props.dispatch(LocalStreamActions.setLocalStream(null));
		this.props.dispatch(RemoteStreamActions.setRemoteStream(null));
		this.props.dispatch(CallStatusActions.resetCallStatus());
	}
	
	render() {
		var callInfo = null;
		if((this.props.callStatus.callStatus === CallStatusActions.INITIATED || this.props.callStatus.callStatus === CallStatusActions.RECEIVED) && (this.props.calledUser.calledUser !== null))
		{
			callInfo = <CallInfo/>
		}
		return (
				<div className="container-fluid">
					<RemoteAudio/>
					<RemoteVideo/>
					<LocalVideo/>
					{callInfo}
					<CallControlBar/>
				</div>
		)
	}
}

export default connect(state => ({
    callStatus: state.CallStatus,
    calledUser: state.CalledUser,
    localStream: state.LocalStream,
    remoteStream: state.RemoteStream,
    call: state.Call
}))(CallUi);