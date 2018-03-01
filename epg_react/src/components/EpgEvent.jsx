import React from 'react';
import './Epg.css';

const EpgEvent = (props) => {
    const { title, size } = props;
    const style = {
        width: 100 * size + '%'
    };

    return <div style = { style } className = 'epg-cell'> { title } </div>;
};

export default EpgEvent;
