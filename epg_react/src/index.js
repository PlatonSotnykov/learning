import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom';
import Mousetrap from 'mousetrap';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

Mousetrap.bind('g', () => { history.push('/guide'); });
Mousetrap.bind('m', () => { history.push('/main'); });

const AppRouter = () => (
    <Router history = { history }>
        <App />
    </Router>
);

ReactDOM.render(<AppRouter />, document.getElementById('root'));
