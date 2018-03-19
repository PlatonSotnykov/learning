import React from 'react';

import './Calculator.css';

const CalculatorKey = (props) => {
    const { onPress, className, ...rest } = props;

    return (
        <button className={`calculator-key ${className}`} {...rest} onClick={onPress}/>
    );
}

export default CalculatorKey;
