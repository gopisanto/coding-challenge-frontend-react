import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import { fetchBikeDetail } from '../reducers';
import StolenBike from './stolen_bike';
import Header from './header';

// const GOOGLE_MAP_API_KEY = 'AIzaSyCbknPP2YH9_s5Gk-icUPGgJ25Iefws-ko';
const GOOGLE_MAP_API_KEY = 'AIzaSyDnKJSIhpSKyzKI39b1ujnd7OPwDMTwwzI';

class StolenBikeDetail extends Component {
  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    this.props.fetchBikeDetail(id);
  }
  render() {
    const { error, bike } = this.props;
    return (
      <div className="stolen-bike-details">
        <Header />
        <div className="map-container">
          <Map
            google={this.props.google}
            style={{ width: '100%', height: '100%' }}
            zoom={14}
            initialCenter={{ lat: 52.520008, lng: 13.404954 }}
          >
            <Marker name="current location" />
          </Map>
        </div>
        {!error && !isEmpty(bike) && <StolenBike data={bike} showDetail={false} />}
        {error && <div>Some issue occured. Try again.</div>}
        <Link to="/">Back to the List</Link>
      </div>
    );
  }
}

StolenBikeDetail.propTypes = {
  match: PropTypes.object.isRequired,
  fetchBikeDetail: PropTypes.func.isRequired,
  bike: PropTypes.object,
  error: PropTypes.string,
  google: PropTypes.any.isRequired,
};

StolenBikeDetail.defaultProps = {
  bike: {},
  error: null,
};

export default connect(
  (state, props) => ({ bike: get(state, `bikes.incidents.${props.match.params.id}`), error: state.bikes.error }),
  { fetchBikeDetail },
)(GoogleApiWrapper({
  apiKey: GOOGLE_MAP_API_KEY,
})(StolenBikeDetail));
