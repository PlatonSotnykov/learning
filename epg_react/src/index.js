import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Mousetrap from 'mousetrap';

Mousetrap.bind('g', () => { console.log('[Guide]') });

const AppRouter = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(<AppRouter />, document.getElementById('root'));
