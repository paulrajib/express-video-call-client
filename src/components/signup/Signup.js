import React, { Component } from 'react';
import SignupForm from './SignupForm';

class Signup extends Component {
	render() {
		return (
				<div className="container-fluid">
					<h1>Signup</h1>
					<SignupForm/>
				</div>
		);
	}
}

export default Signup;