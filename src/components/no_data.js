import React from 'react';
import PropTypes from 'prop-types';

const NoData = ({ message }) => <div>{message}</div>;

NoData.propTypes = {
  message: PropTypes.string,
};

NoData.defaultProps = {
  message: 'No data found',
};

export default NoData;
