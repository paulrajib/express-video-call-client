import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Ringing as RingingActions, CallStatus as CallStatusActions, Call as CallActions } from '../../../actions';

class CallReceiveBtn extends Component {
	
	constructor(props) {
		super(props);
		this.receiveCall = this.receiveCall.bind(this);
	};
	
	receiveCall()
	{
		if(this.props.callStatus.callStatus === CallStatusActions.RECEIVED)
		{
			this.props.dispatch(RingingActions.stopRinging());
			if(this.props.call.call && this.props.localStream.localStream)
			{
				this.props.call.call.answer(this.props.localStream.localStream);
				this.props.dispatch(CallStatusActions.setCallStatus(CallStatusActions.ANSWERED));
			}
		}
	}
	
	render() {
		return (
			<span className="fa-stack fa-2x circle call-ctrl" onClick={this.receiveCall}>
				<span className="fa fa-phone fa-2x call-receive"></span>
			</span>
		)
	}
}

export default connect(state => ({
    ringing: state.Ringing,
    callStatus: state.CallStatus,
    call: state.Call,
    localStream: state.LocalStream
})) (CallReceiveBtn);