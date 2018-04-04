import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom';
import Mousetrap from 'mousetrap';
import { createBrowserHistory } from 'history';
import lineup from './models/lineup';

const history = createBrowserHistory();

Mousetrap.bind('g', () => { history.push('/guide'); });
Mousetrap.bind('m', () => { history.push('/main'); });

const AppRouter = () => (
    <Router history = { history }>
        <App />
    </Router>
);

lineup.initialize()
    .then(() => {
        ReactDOM.render(<AppRouter />, document.getElementById('root'));
    });
