import React from 'react';
import './Epg.css';

function formatTime(time) {
    const d = new Date(time * 1000);
    let hh = '' + d.getHours();
    let mm = '' + d.getMinutes();

    if (hh.length < 2) {
        hh = '0' + hh;
    }

    if (mm.length < 2) {
        mm = '0' + mm;
    }

    return hh + ':' + mm;
}

const EpgEvent = (props) => {
    const { title, size, startTime, endTime, fake } = props;
    const style = {
        width: 100 * size + '%'
    };
    let className = 'epg-cell epg-event';

    if (fake) {
        className += ' epg-event-fake';
    }
    return (
        <div style = {style} className = {className}>
            <p>{!fake ? title : 'No information available'}</p>
            {!fake &&
                <p>{formatTime(startTime)} - {formatTime(endTime)}</p>
            }
        </div>
    );
};

export default EpgEvent;
