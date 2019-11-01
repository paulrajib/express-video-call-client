import React, { Component } from 'react';
import { connect } from 'react-redux';
class RemoteAudio extends Component {
	constructor(props) {
		super(props);
	};
	
	render() {
		var remoteAudioUrl = "";
		if(this.props.remoteStream.remoteStream !== null)
		{
			remoteAudioUrl = window.URL.createObjectURL(this.props.remoteStream.remoteStream);
		}
		return (
			<audio autoPlay ref={(audio) => { this.remoteAudio = audio; }} src={remoteAudioUrl}/>
		)
	}
}

export default connect(state => ({
	remoteStream: state.RemoteStream
})) (RemoteAudio);