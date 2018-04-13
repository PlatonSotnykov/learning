import React from 'react';
import './Epg.css';

function formatTime(time) {
    const d = new Date(time * 1000);
    const hh = '' + d.getHours();
    let mm = '' + d.getMinutes();

    if (mm.length < 2) {
        mm = mm + '0';
    }

    return hh + ':' + mm;
}

const EpgEvent = (props) => {
    const { title, size, startTime, endTime } = props;
    const style = {
        width: 100 * size + '%'
    };

    return (<div style = { style } className = 'epg-cell epg-event'>
        <p>{title}</p>
        <p>{formatTime(startTime)} - {formatTime(endTime)}</p>
    </div>);
};

export default EpgEvent;
