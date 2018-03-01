import React from 'react';
import './Epg.css';
import './EpgChannel.css';

const EpgChannel = (props) => {
    const { number, name } = props;

    return (
        <div className = 'epg-left epg-container'>
            <div className = 'epg-cell epg-channel-number'> {number} </div>
            <div className = 'epg-cell epg-channel-name'> {name} </div>
        </div>
    );
};

export default EpgChannel;
