import React from 'react';
import EpgEvent from './EpgEvent';
import './Epg.css';

const EpgEvents = (props) => {
    const { events, startTime, timeFrameDuration } = props;

    return (
        <div className = 'epg-right epg-container'>
            { events.map((event) => {
                const { eventId, title, startTime: eventStartTime, endTime: eventEndTime } = event;
                const endTime = startTime + timeFrameDuration;
                let size;

                if (eventStartTime >= startTime && eventEndTime <= endTime) {
                    size = (eventEndTime - eventStartTime) / timeFrameDuration;
                } else if (eventStartTime < startTime) {
                    size = (eventEndTime - startTime) / timeFrameDuration;
                } else if (eventEndTime > endTime) {
                    size = (endTime - eventStartTime) / timeFrameDuration;
                }

                return <EpgEvent key = { eventId } title = { title } size = { size } />;
            }) }
        </div>
    );
};

export default EpgEvents;
