import React, { Component } from 'react';
import { connect } from 'react-redux';
import './local-video.css';

class LocalVideo extends Component {
	constructor(props) {
		super(props);
	};
	
	render() {
		var localVideoUrl = "";
		if(this.props.localStream.localStream !== null)
		{
			localVideoUrl = window.URL.createObjectURL(this.props.localStream.localStream);
		}
		return (
			<div className="local-video-container">
				<video ref={(video) => { this.localVideo = video; }} src={localVideoUrl} className="local-vid vid"></video>
			</div>
		)
	}
}

export default connect(state => ({
	localStream: state.LocalStream
})) (LocalVideo);