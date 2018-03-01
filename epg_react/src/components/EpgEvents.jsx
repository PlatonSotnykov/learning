import React from 'react';
import EpgEvent from './EpgEvent'

const EpgEvents = (props) => {
    const { events, startTime, timeFrameDuration } = props;

    return (
        <div>
            { events.map((event) => {
                const { eventId, title } = event;

                return <EpgEvent key = { eventId } title = { title } />;
            }) }
        </div>
    );
};

export default EpgEvents;
