import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Ringer extends Component {
	constructor(props) {
		super(props);
	}
	
	componentWillUpdate(nextProps, nextState) {
		var ringer = this.ringer;
		if(nextProps.playStatus == true)
		{
			ringer.play();
		}
		else
		{
			ringer.pause();
			ringer.load();
		}
	}
	
	render()
	{
		return (
				<audio ref={(audio) => { this.ringer = audio; }} src={this.props.src} loop />
		);
	}
}

export default Ringer;