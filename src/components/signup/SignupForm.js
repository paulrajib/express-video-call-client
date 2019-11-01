import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { register, login } from '../../utils/AuthService';
import { sendRequest } from '../../utils/APIService';
import { createPeerObject } from '../../utils/PeerService';
import { createSocket } from '../../utils/SocketService';
import { Peer as PeerActions, AuthUser as AuthUserActions, AccessToken as AccessTokenActions, Socket as SocketActions } from '../../actions';

class SignupForm extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
		this.doSignup = this.doSignup.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	
	doSignup(e) {
		e.preventDefault();
		const email = this.state.email;
		const password = this.state.password;
		register(email, password).then((response) => {
			var data = response.data;
			if(data.success === true)
			{
				login(email, password).then((response) => {
					var data = response.data;
					if(data.success === true)
					{
						var token = data.token;
						this.props.dispatch(AccessTokenActions.setLoggedIn(token));
						sendRequest('/api/users/detail', 'get').then((response) => {
							var data = response.data;
							if(data.success === true)
							{
								var user = data.user;
								this.props.dispatch(AuthUserActions.setAuthUser(user));
								var peer = createPeerObject(user._id);
								this.props.dispatch(PeerActions.setPeer(peer));
								var socket = createSocket(peer.socket.id);
								this.props.dispatch(SocketActions.setSocket(socket));
								this.props.history.push('/');
							}
						});
					}
				});
			}
		});
	}
	
	handleInputChange(e) {
		e.preventDefault();
		const target = e.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name]: value
		});
	}
	
	render() {
		return (
			<form onSubmit={ this.doSignup }>
				<div className="col-md-12">
					<div className="form-group">
						<label className="control-label">Email</label>
						<input type="text" className="form-control" name="email" placeholder="Enter Email" onChange={this.handleInputChange}/>
					</div>
				</div>
				<div className="col-md-12">
					<div className="form-group">
						<label className="control-label">Password</label>
						<input type="password" className="form-control" name="password" placeholder="Enter Password" onChange={this.handleInputChange}/>
					</div>
				</div>
				<div className="col-md-12">
					<button type="submit" className="btn btn-default">Signup</button>
				</div>
			</form>
		);
	}
}

export default connect(state => ({
    accessToken: state.AccessToken,
    authUser: state.AuthUser,
    peer: state.Peer
}))(withRouter(SignupForm));