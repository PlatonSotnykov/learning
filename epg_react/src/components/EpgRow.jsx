import React from 'react';
import './Epg.css';

const EpgRow = (props) => {
    return <div className = 'epg-container'> {props.children} </div>;
};

export default EpgRow;
