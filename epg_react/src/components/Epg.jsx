import React from 'react';

import Grid from './Grid';
import Row from './Row';

import EpgDay from './EpgDay';
import EpgTimeLine from './EpgTimeLine';

import EpgChannel from './EpgChannel';
import EpgEvents from './EpgEvents';

const Epg = (props) => {
    const { channels, timeFrameDuration, timeStep, startTime } = props;

    return (
        <Grid>
            <Row>
                <EpgDay startTime = { startTime } />
                <EpgTimeLine startTime = { startTime } timeFrameDuration = { timeFrameDuration } timeStep = { timeStep } />
            </Row>
            { props.channels.map((channel) => {
                const { channelId, name, channelNumber, events } = channel;

                return (
                    <Row key = { channelId } >
                        <EpgChannel number = { channelNumber } name = { name } />
                        <EpgEvents events = { events } startTime = { startTime } timeFrameDuration = { timeFrameDuration } />
                    </Row>
                );
            }) }
        </Grid>
    );
};

export default Epg;
