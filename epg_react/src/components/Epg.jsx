import React from 'react';

import Grid from './Grid';
import Row from './Row';

import EpgDay from './EpgDay';
import EpgTimeLine from './EpgTimeLine';

import EpgChannel from './EpgChannel';
import EpgEvents from './EpgEvents';

const Epg = (props) => {
    return (
        <Grid>
            <Row>
                <EpgDay startTime = { props.startTime } />
                <EpgTimeLine startTime = { props.startTime } timeFrameDuration = { props.timeFrameDuration } />
            </Row>
            { props.channels.map((channel) => {
                return (
                    <Row key = { channel.id } >
                        <EpgChannel id = { channel.id } number = { channel.number } name = { channel.name } />
                        <EpgEvents events = { channel.events } startTime = { props.startTime }
                            timeFrameDuration = { props.timeFrameDuration } />
                    </Row>
                );
            }) }
        </Grid>
    );
};

export default Epg;
