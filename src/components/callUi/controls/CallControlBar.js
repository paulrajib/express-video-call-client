import React, { Component } from 'react';
import CallReceiveBtn from './CallReceiveBtn';
import CallTerminateBtn from './CallTerminateBtn';
import './controls.css';
class CallControlBar extends Component {
	render() {
		return (
			<div className="container-fluid call-ctrl-bar">
				<CallReceiveBtn/>&nbsp;&nbsp;
				<CallTerminateBtn/>
			</div>
		)
	}
}

export default CallControlBar;