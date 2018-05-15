import React from 'react';
import EpgEvent from './EpgEvent';
import './Epg.css';

const EpgEvents = (props) => {
    const { events, startTime, timeFrameDuration } = props;
    const endTime = startTime + timeFrameDuration;

    if (events) {
        return (
            <div className = 'epg-right epg-container'>
                {events.map((event, index) => {
                    const { eventId, title, startTime: eventStartTime, endTime: eventEndTime, fake } = event;
                    let size;

                    if (eventStartTime >= startTime && eventEndTime <= endTime) {
                        size = (eventEndTime - eventStartTime) / timeFrameDuration;
                    } else if (eventStartTime < startTime) {
                        size = (eventEndTime - startTime) / timeFrameDuration;
                    } else if (eventEndTime > endTime) {
                        size = (endTime - eventStartTime) / timeFrameDuration;
                    }
                    return (
                        <EpgEvent
                            key = {eventId || index}
                            title = {title}
                            startTime = {eventStartTime}
                            endTime = {eventEndTime}
                            size = {size}
                            fake = {fake}
                        />
                    );
                })}
            </div>
        );
    } else {
        return (
            <div className = 'epg-right epg-container'>
                <EpgEvent
                    fake = {true}
                    size = {1}
                />
            </div>
        );
    }
};

export default EpgEvents;
