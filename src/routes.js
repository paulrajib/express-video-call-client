import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './components/App';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

export default (
    <App>
    	<Switch>
    		<Route exact path='/' component={Home} />
    		<Route path="/login" component={Login} />
    		<Route path="/signup" component={Signup} />
    	</Switch>
    </App>
)