import React from 'react';
import './Epg.css';
// import PropTypes from 'prop-types'

// import Row from './Row';

const EpgGrid = (props) => {
    return <div className = 'epg-grid'> {props.children} </div>;
};

// Grid.propTypes = {
//     children: PropTypes.oneOfType([
//         PropTypes.instanceOf(Row),
//         PropTypes.arrayOf(PropTypes.instanceOf(Row))
//     ])
// };

export default EpgGrid;
