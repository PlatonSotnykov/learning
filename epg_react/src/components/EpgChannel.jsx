import React from 'react';

const EpgChannel = (props) => {
    const { number, name } = props;

    return <div> { `${number}: ${name}` } </div>;
};

export default EpgChannel;
