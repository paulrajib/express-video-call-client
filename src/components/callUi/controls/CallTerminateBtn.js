import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Ringing as RingingActions, CallStatus as CallStatusActions, Call as CallActions, LocalStream as LocalStreamActions } from '../../../actions';

class CallTerminateBtn extends Component {
	
	constructor(props) {
		super(props);
		this.terminateCall = this.terminateCall.bind(this);
	};
	
	terminateCall()
	{
		if(this.props.callStatus.callStatus === CallStatusActions.RECEIVED)
		{
			this.props.dispatch(RingingActions.stopRinging());
		}
		if(this.props.call.call)
		{
			this.props.call.call.close();
			if(this.props.call.call.open === true)
			{
				this.props.dispatch(CallStatusActions.setCallStatus(CallStatusActions.ENDED));
			}
			else
			{
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
				this.props.dispatch(CallActions.setCall(null));
				this.props.dispatch(CallStatusActions.resetCallStatus());
			}
		}
	}
	
	render() {
		return (
			<span className="fa-stack fa-2x circle call-ctrl" onClick={this.terminateCall}>
				<span className="fa fa-phone fa-2x call-end"></span>
			</span>
		)
	}
}

export default connect(state => ({
    ringing: state.Ringing,
    call: state.Call,
    callStatus: state.CallStatus,
    localStream: state.LocalStream
})) (CallTerminateBtn);