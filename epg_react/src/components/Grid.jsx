import React from 'react';
// import PropTypes from 'prop-types'

// import Row from './Row';

const Grid = (props) => {
    return <div> { props.children } </div>;
};

// Grid.propTypes = {
//     children: PropTypes.oneOfType([
//         PropTypes.instanceOf(Row),
//         PropTypes.arrayOf(PropTypes.instanceOf(Row))
//     ])
// };

export default Grid;
