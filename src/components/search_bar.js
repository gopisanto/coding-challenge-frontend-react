import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const SearchInput = ({
  onFilterChange,
  search,
  startDate: initialStartDate,
  endDate: initialEndDate,
  searchDisabled,
}) => {
  const [term, setTerm] = useState(search);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [error, setError] = useState(null);

  function handleSearchClick() {
    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date cannot be greater than end date.');
    } else {
      onFilterChange({ term, startDate, endDate });
    }
  }

  function handleChange(event) {
    setError(null);
    setTerm(event.target.value);
  }

  return (
    <React.Fragment>
      <div className="search-bar">
        <input
          type="text"
          value={term}
          onChange={handleChange}
          disabled={searchDisabled}
          placeholder="search case descriptions"
        />
        <input
          type="date"
          onChange={({ target: { value } }) => setStartDate(value)}
          value={startDate}
          disabled={searchDisabled}
          placeholder="from"
        />
        <input
          type="date"
          value={endDate}
          onChange={({ target: { value } }) => setEndDate(value)}
          disabled={searchDisabled}
          placeholder="to"
        />
        <input
          type="button"
          onClick={handleSearchClick}
          value="Find cases"
        />
      </div>
      { error && <div className="error">{error}</div> }
    </React.Fragment>
  );
};

SearchInput.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  search: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  searchDisabled: PropTypes.bool,
};

SearchInput.defaultProps = {
  search: '',
  startDate: '',
  endDate: '',
  searchDisabled: false,
};

export default SearchInput;
