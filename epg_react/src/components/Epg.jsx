import React from 'react';
import EpgGrid from './EpgGrid';
import EpgRow from './EpgRow';
import EpgDay from './EpgDay';
import EpgTimeLine from './EpgTimeLine';
import EpgChannel from './EpgChannel';
import EpgEvents from './EpgEvents';

import Mousetrap from 'mousetrap';

import lineup from '../models/lineup';

const PORT = 3030;

// Guide grid parameters (for now hard-coded)
const timeFrameDuration = 2 * 3600;
const timeStep = 0.5 * 3600;
// const maxChannels = 7;

const EPG_DATA_START_TIME = 1519779600;
// const EPG_DATA_END_TIME = 1519858800;

const Epg = (props) => {
    const { startTime, channels, events } = props;

    return (
        <EpgGrid>
            <EpgRow>
                <EpgDay startTime = {startTime} />
                <EpgTimeLine startTime = {startTime} timeFrameDuration = {timeFrameDuration} timeStep = {timeStep} />
            </EpgRow>
            {channels.map((channel) => {
                const { channelId, name, channelNumber } = channel;

                return (
                    <EpgRow key = {channelId} >
                        <EpgChannel number = {channelNumber} name = {name} />
                        <EpgEvents events = {events[channelId]} startTime = {startTime} timeFrameDuration = {timeFrameDuration} />
                    </EpgRow>
                );
            })}
        </EpgGrid>
    );
};

function controlledEpg(Epg) {
    return class ControlledEpg extends React.Component {
        constructor(props) {
            super(props);
            this.onKeyPress = this.onKeyPress.bind(this);
            this.keys = ['left', 'right', 'up', 'down'];
            this.state = {
                // startTime: ~~(Date.now() / 1000),
                startTime: EPG_DATA_START_TIME,
                channels: lineup.getChannels(),
                events: {}
            };
        }

        fetchEvents(startTime) {
            const url = `http://localhost:${PORT}/events/{channelId}`;
            const eventsPromises = [];
            const eventsMap = {};

            this.state.channels.forEach((channel) => {
                eventsPromises.push(fetch(url.replace('{channelId}', channel.channelId), {
                    method: 'PUT',
                    body: JSON.stringify({
                        startTime,
                        duration: timeFrameDuration
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                }));
            });
            Promise.all(eventsPromises).then((responses) => {
                const parsingPromises = [];

                responses.forEach(response => parsingPromises.push(response.json()));
                Promise.all(parsingPromises).then((channelsEvents) => {
                    channelsEvents.forEach((events) => {
                        if (events.length) {
                            eventsMap[events[0].channelId] = events;
                        }
                    });
                    this.setState({ events: eventsMap });
                });
            });
        }

        onKeyPress(e) {
            switch (e.key) {
                case 'ArrowLeft':
                    this.setState((prevState, props) => {
                        const startTime = prevState.startTime - timeFrameDuration;

                        this.fetchEvents(startTime);
                        return { startTime };
                    });
                    break;
                case 'ArrowRight':
                    this.setState((prevState, props) => {
                        const startTime = prevState.startTime + timeFrameDuration;

                        this.fetchEvents(startTime);
                        return { startTime };
                    });
                    break;
                default:
            }
        }

        componentDidMount() {
            Mousetrap.bind(this.keys, this.onKeyPress);
            this.fetchEvents(this.state.startTime);
        }

        componentWillUnmount() {
            Mousetrap.unbind(this.keys);
        }

        render() {
            const { startTime, channels, events } = this.state;

            return <Epg {...this.props} startTime = {startTime} channels = {channels} events = {events} />;
        }
    }
}

export default controlledEpg(Epg);
