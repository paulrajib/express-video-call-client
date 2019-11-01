import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store';
import routes from './routes';

const Root = () => <Provider store={store}><Router>{routes}</Router></Provider>

ReactDOM.render(<Root />, document.getElementById('root'));
