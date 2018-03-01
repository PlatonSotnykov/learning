// import React from 'react';

const EpgChannel = (props) => {
    const { number, name } = props;

    return `${number}: ${name}`;
};

export default EpgChannel;
