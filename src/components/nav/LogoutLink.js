import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../utils/AuthService';
import { AccessToken as AccessTokenActions, AuthUser as AuthUserActions, Peer as PeerActions, Socket as SocketActions } from '../../actions';

class LogoutLink extends Component
{	
	constructor(props) {
		super(props);
		this.doSignout = this.doSignout.bind(this);
	}
	
	doSignout(e)
	{
		e.preventDefault();
		this.props.dispatch(AccessTokenActions.setLoggedOut());
		this.props.dispatch(AuthUserActions.deleteAuthUser());
		this.props.dispatch(PeerActions.deletePeer());
		this.props.dispatch(SocketActions.deleteSocket());
	}
	
	render()
	{
		return(
				<li><a href="/logout" onClick={this.doSignout}>Signout</a></li>
		);
	}
}

export default connect(state => ({
    accessToken: state.AccessToken,
    authUser: state.AuthUser
}))(LogoutLink);