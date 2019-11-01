import React, { Component } from 'react';
import LoginForm from './LoginForm';

class Login extends Component {
	render() {
		return (
				<div className="container-fluid">
					<h1>Login</h1>
					<div className="row">
						<LoginForm/>
					</div>
				</div>
		);
	}
}

export default Login;