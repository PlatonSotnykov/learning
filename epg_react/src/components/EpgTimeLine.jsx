import React from 'react';
import './Epg.css';

function formatTime(time) {
    const d = new Date(time * 1000);
    let hh = d.getHours().toString();
    let mm = d.getMinutes().toString();

    if (hh.length < 2) {
        hh = '0' + hh;
    }
    if (mm.length < 2) {
        mm = '0' + mm;
    }
    return hh + ':' + mm;
}

const EpgTimeLine = (props) => {
    const { startTime, timeFrameDuration, timeStep } = props;
    const framesCount = timeFrameDuration / timeStep;
    const timeLine = [];
    let time = startTime;
    const style = {
        width: 100 / framesCount + '%'
    };

    while (time < startTime + timeFrameDuration) {
        timeLine.push(<div key = { time } style = { style } className = 'epg-cell'> { formatTime(time) } </div>);
        time += timeStep;
    }

    return (
        <div className = 'epg-container epg-right'>
            { timeLine }
        </div>
    );
};

export default EpgTimeLine;
