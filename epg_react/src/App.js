import React, { Component } from 'react';
import Epg from './components/Epg';

function fetchChannels() {
    const port = 3030;
    const getChannels = '/channels';

    return fetch(`http://localhost:${port}${getChannels}`).then((response) => {
        if (response.ok) {
            return response.json().then((channels) => {
                const getEvents = '/events/{channelId}';
                const url = `http://localhost:${port}${getEvents}`;
                const eventsPromises = [];
                const channelsMap = new Map();

                channels.forEach((channel) => {
                    const channelId = channel.channelId;

                    eventsPromises.push(fetch(url.replace('{channelId}', channelId)));
                    channelsMap.set(channelId, channel);
                });

                return Promise.all(eventsPromises).then((responses) => {
                    const parsingPromises = [];

                    responses.forEach(response => parsingPromises.push(response.json()));

                    return Promise.all(parsingPromises).then((channelsEvents) => {
                        channelsEvents.forEach((events) => {
                            channelsMap.get(events[0].channelId).events = events;
                        });

                        return channels;
                    });
                });
            });
        }

        return Promise.resolve([]);
    });
}

class App extends Component {
    constructor(props) {
        super(props);
        const timeStep = 0.5 * 3600;
        this.state = {
            channels: [],
            timeFrameDuration: 2 * 3600,
            timeStep
        };
        const now = ~~(Date.now() / 1000);
        this.state.startTime = now - (now % timeStep);
    }

    componentDidMount() {
        fetchChannels().then(channels => this.setState({ channels }));
    }

    render() {
        const { channels, timeFrameDuration, timeStep, startTime } = this.state;

        return <Epg
            channels = { channels }
            startTime = { startTime }
            timeFrameDuration = { timeFrameDuration }
            timeStep = { timeStep }
        />;
    }
}

export default App;
