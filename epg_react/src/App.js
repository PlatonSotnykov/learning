import React, { Component } from 'react';
import Epg from './components/Epg';

const channels = [
    {
        id: 'channel_id0',
        number: 0,
        name: 'channel0_name',
        events: []
    },
    {
        id: 'channel_id1',
        number: 1,
        name: 'channel1_name',
        events: []
    },
    {
        id: 'channel_id2',
        number: 2,
        name: 'channel2_name',
        events: []
    },
    {
        id: 'channel_id3',
        number: 3,
        name: 'channel3_name',
        events: []
    },
    {
        id: 'channel_id4',
        number: 4,
        name: 'channel4_name',
        events: []
    },
    {
        id: 'channel_id5',
        number: 5,
        name: 'channel5_name',
        events: []
    },
    {
        id: 'channel_id6',
        number: 6,
        name: 'channel6_name',
        events: []
    }
];

class App extends Component {
    render() {
        return <Epg
            channels = { channels }
            startTime = { Date.now() }
            timeFrameDuration = { 7200 }
        />;
    }
}

export default App;
