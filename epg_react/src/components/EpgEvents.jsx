import React from 'react';
import EpgEvent from './EpgEvent';
import './Epg.css';

const EpgEvents = (props) => {
    const { events, startTime, timeFrameDuration } = props;

    return (
        <div className = 'epg-right epg-container'>
            { events.map((event) => {
                const { eventId, title } = event;

                return <EpgEvent key = { eventId } title = { title } />;
            }) }
        </div>
    );
};

export default EpgEvents;
