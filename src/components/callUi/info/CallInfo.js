import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CallStatus as CallStatusActions } from '../../../actions';
import './callInfo.css';

class CallInfo extends Component {
	
	constructor(props) {
		super(props);
	};
	
	render() {
		var callTitle = null;
		if(this.props.callStatus.callStatus === CallStatusActions.INITIATED)
		{
			callTitle = 'Call To';
		}
		else if(this.props.callStatus.callStatus === CallStatusActions.RECEIVED)
		{
			callTitle = 'Call From';
		}
		return (
			<div className="call-info">
				<div className="call-info-inner">
					<h2 className="call-title">{callTitle}</h2>
					<h2>{this.props.calledUser.calledUser.email}</h2>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
    callStatus: state.CallStatus,
    calledUser: state.CalledUser
}))(CallInfo);