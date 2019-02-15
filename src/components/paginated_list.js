import React from 'react';
import PropTypes from 'prop-types';

const PaginatedList = ({ bikes }) => (
  <div className="paginated-list">
    <ul>
      { bikes.length > 0 && bikes.map(bike => <li>{bike.title}</li>) }
    </ul>
  </div>
);

PaginatedList.propTypes = {
  bikes: PropTypes.array,
};

PaginatedList.defaultProps = {
  bikes: [],
};

export default PaginatedList;
