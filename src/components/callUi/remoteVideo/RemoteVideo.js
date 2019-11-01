import React, { Component } from 'react';
import { connect } from 'react-redux';
import './remote-video.css';

class RemoteVideo extends Component {
	constructor(props) {
		super(props);
	};
	
	render() {
		var remoteVideoUrl = "";
		if(this.props.remoteStream.remoteStream !== null)
		{
			remoteVideoUrl = window.URL.createObjectURL(this.props.remoteStream.remoteStream);
		}
		return (
			<div className="remote-video-container">
				<video src={remoteVideoUrl} ref={(video) => { this.remoteVideo = video; }} className="remote-vid vid"></video>
			</div>
		)
	}
}

export default connect(state => ({
	remoteStream: state.RemoteStream
})) (RemoteVideo);