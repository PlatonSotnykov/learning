import React from 'react';
import Main from './components/Main';
import Epg from './components/Epg';
import { Route, Redirect, Switch } from 'react-router-dom';

function renderMain() {
    return <Main />;
}

function renderGuide() {
    return <Epg />;
}

const App = () => {
    return (
        <Switch>
            <Route exact path = '/main' render={ renderMain } />
            <Redirect exact from = '/' to = '/main' />
            <Route exact path = '/guide' render={ renderGuide } />
        </Switch>
    );
}

export default App;
