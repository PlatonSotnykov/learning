import React from 'react';
import './Epg.css';

const EpgChannel = (props) => {
    const { number, name } = props;

    return (
        <div className = 'epg-left epg-container'>
            <div className = 'epg-cell epg-left'> {number} </div>
            <div className = 'epg-cell epg-right'> {name} </div>
        </div>
    );
};

export default EpgChannel;
