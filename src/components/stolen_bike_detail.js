import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import { fetchBikeDetail } from '../reducers';
import StolenBike from './stolen_bike';

class StolenBikeDetail extends Component {
  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    this.props.fetchBikeDetail(id);
  }
  render() {
    const { error, bike } = this.props;
    return (
      <React.Fragment>
        {!error && !isEmpty(bike) && <StolenBike data={bike} showDetail={false} />}
        {error && <div>Some issue occured. Try again.</div>}
        <Link to="/">Back to the List</Link>
      </React.Fragment>
    );
  }
}

StolenBikeDetail.propTypes = {
  match: PropTypes.object.isRequired,
  fetchBikeDetail: PropTypes.func.isRequired,
  bike: PropTypes.object,
  error: PropTypes.string,
};

StolenBikeDetail.defaultProps = {
  bike: {},
  error: null,
};

export default connect(
  (state, props) => ({ bike: get(state, `bikes.incidents.${props.match.params.id}`), error: state.bikes.error }),
  { fetchBikeDetail },
)(StolenBikeDetail);
