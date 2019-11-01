import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendRequest } from '../../utils/APIService';
import ContactElement from '../contactElement/ContactElement';
import './contactBar.css';
import { Contacts as ContactsActions } from '../../actions';

class ContactBar extends Component {
	
	constructor(props) {
		super(props);
	};

	componentDidMount() {
		sendRequest('/api/users', 'get').then((response) => {
			var users = response.data.users;
			var fmtUsers = [];
			for(var i = 0; i < users.length; i++)
			{
				var user = users[i];
				if(user.email !== this.props.authUser.authUser.email)
				{
					var activePeerConnections = [];
					for(var j = 0; j < user.activePeerConnections.length; j++)
					{
						activePeerConnections.push(user.activePeerConnections[j].peerId);
					}
				
					var fmtUser = {
							activePeerConnections: activePeerConnections,
							email: user.email,
							isOnline: user.isOnline
					};
				
					fmtUsers.push(fmtUser);
				}
			}
			this.props.dispatch(ContactsActions.setContacts(fmtUsers));
		})
	}
	
	render() {
		return (
				<div className="col-sm-3 col-md-3 sidebar">
					<ul className="nav nav-sidebar">
						{this.props.contacts.contacts.map((contact, index) => (
							<ContactElement key={index} peerConnections={contact.activePeerConnections} isOnline={contact.isOnline} email={contact.email}/>
						))}
					</ul>
				</div>
		);
	}
}

export default connect(state => ({
    authUser: state.AuthUser,
    contacts: state.Contacts
}))(ContactBar);