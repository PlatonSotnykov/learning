import React from 'react';
import EpgGrid from './EpgGrid';
import EpgRow from './EpgRow';
import EpgDay from './EpgDay';
import EpgTimeLine from './EpgTimeLine';
import EpgChannel from './EpgChannel';
import EpgEvents from './EpgEvents';

const Epg = (props) => {
    const { channels, timeFrameDuration, timeStep, startTime } = props;

    return (
        <EpgGrid>
            <EpgRow>
                <EpgDay startTime = { startTime } />
                <EpgTimeLine startTime = { startTime } timeFrameDuration = { timeFrameDuration } timeStep = { timeStep } />
            </EpgRow>
            { props.channels.map((channel) => {
                const { channelId, name, channelNumber, events } = channel;

                return (
                    <EpgRow key = { channelId } >
                        <EpgChannel number = { channelNumber } name = { name } />
                        <EpgEvents events = { events } startTime = { startTime } timeFrameDuration = { timeFrameDuration } />
                    </EpgRow>
                );
            }) }
        </EpgGrid>
    );
};

export default Epg;
