import React from 'react';
import './Epg.css';

const EpgEvent = (props) => {
    const { title } = props;

    return <div className = 'epg-cell'> { title } </div>;
};

export default EpgEvent;
