import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PaginatedList from './paginated_list';
import StolenBike from './stolen_bike';
import SearchInput from './search_bar';
import NoData from './no_data';
import Header from './header';

import { fetchBikes, filterBikeList } from '../reducers';

class StolenBikes extends Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchBikes();
  }

  handleFilterChange({ term, startDate, endDate }) {
    this.props.filterBikeList({ search: term, startDate, endDate });
  }

  render() {
    const {
      loading,
      bikes,
      search,
      startDate,
      endDate,
      error,
    } = this.props;

    return (
      <div className="stolen-bikes">
        <Header />
        <SearchInput
          onFilterChange={this.handleFilterChange}
          search={search}
          startDate={startDate}
          endDate={endDate}
        />
        { error && <p className="error">{error}</p>}
        { !error && loading && <div>Loading...</div> }
        {
          bikes && bikes.length === 0
            ? !error && !loading && <NoData />
            : !error && !loading && <PaginatedList data={bikes} itemRenderer={StolenBike} />
        }
      </div>
    );
  }
}

StolenBikes.propTypes = {
  bikes: PropTypes.array,
  fetchBikes: PropTypes.func.isRequired,
  filterBikeList: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  search: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  error: PropTypes.string,
};

StolenBikes.defaultProps = {
  bikes: [],
  loading: false,
  search: '',
  startDate: '',
  endDate: '',
  error: null,
};

export default connect(
  state => ({
    bikes: state.bikes.filteredBikes,
    loading: state.bikes.loading,
    search: state.bikes.search,
    startDate: state.bikes.startDate,
    endDate: state.bikes.endDate,
    error: state.bikes.error,
  }),
  { fetchBikes, filterBikeList },
)(StolenBikes);
