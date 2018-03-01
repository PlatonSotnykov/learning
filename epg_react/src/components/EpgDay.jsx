import React from 'react';
import './Epg.css';

const EpgDay = (props) => {
    const { startTime } = props;

    return <div className = 'epg-cell epg-left'>Today</div>;
};

export default EpgDay;
