import React, { Component } from 'react';
import ContactBar from '../contactBar/ContactBar';
import MainContent from './MainContent';
import './dashboard.css';

class Dashboard extends Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<ContactBar/>
					<MainContent/>
				</div>
			</div>
		);
	}
}

export default Dashboard;