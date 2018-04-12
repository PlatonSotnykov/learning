import React from 'react';
import './Epg.css';

const DAY = 24 * 3600;

const WEEK_DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

function getDayOfWeek(time) {
    const d = new Date();
    const tzOffset = d.getTimezoneOffset() * 60;
    const now = ~~(d.getTime() / 1000);
    const todayDayIdx = ~~((now - tzOffset) / DAY);
    const dayIdx = ~~((time - tzOffset) / DAY);

    if (dayIdx === todayDayIdx) {
        return 'Today';
    } else if ((dayIdx - todayDayIdx) === 1) {
        return 'Tomorrow';
    } else {
        return WEEK_DAYS[(new Date(time * 1000)).getDay()]
    }
}

const EpgDay = (props) => {
    const { startTime } = props;

    return <div className = 'epg-cell epg-left epg-day'>{getDayOfWeek(startTime)}</div>;
};

export default EpgDay;
