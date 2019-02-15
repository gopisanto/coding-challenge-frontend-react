import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import PaginatedList from './paginated_list';

import { fetchBikes } from '../reducers';

class StolenBikes extends Component {
  componentDidMount() {
    this.props.fetchBikes();
  }

  render() {
    const bikes = get(this.props.bikes, 'bikes.data.incidents');

    if (isEmpty(bikes) || bikes.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div className="stolen-bikes">
        <div className="header">
          <img className="logo" alt="police" src="../../screens/police.jpg" />
          <div className="titles">
            <h1>Police Department Of Berlin</h1>
            <h3>Stolen Bykes</h3>
          </div>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="search case descriptions" />
          <input type="date" placeholder="from" />
          <input type="date" placeholder="to" />
          <input type="button" value="Find cases" />
        </div>
        <PaginatedList bikes={bikes} />
        <Link to="/incident/2">Click me</Link>
      </div>
    );
  }
}

StolenBikes.propTypes = {
  bikes: PropTypes.array,
  fetchBikes: PropTypes.func.isRequired,
};

StolenBikes.defaultProps = {
  bikes: [],
};

export default connect(
  state => ({ bikes: state.bikes }),
  { fetchBikes },
)(StolenBikes);
