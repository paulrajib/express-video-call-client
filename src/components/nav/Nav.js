import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutLink from './LogoutLink';
import './navbar.css';

class Nav extends Component
{	
	render()
	{
		let loginLink = null;
		let signupLink = null;
		let logoutLink = null;
		if(this.props.accessToken.accessToken == null)
		{
			loginLink = <li><Link to="login">Log In</Link></li>;
			signupLink = <li><Link to="signup">Signup</Link></li>;
		}
		else
		{
			logoutLink = <LogoutLink/>
		}
		return (
				<nav className="navbar navbar-inverse">
					<div className="navbar-header">
						<Link className="navbar-brand" to="/">Express Video Call</Link>
					</div>
					<div className="navbar-collapse collapse">
						<ul className="nav navbar-nav">
						</ul>
						<ul className="nav navbar-nav navbar-right">
		        			{ loginLink }
		        			{ signupLink }
		        			{ logoutLink }
		        		</ul>
					</div>
				</nav>
		);
	}
}

export default connect(state => ({
    accessToken: state.AccessToken,
    authUser: state.AuthUser
}))(Nav);