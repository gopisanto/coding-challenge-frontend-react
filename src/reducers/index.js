import { combineReducers } from 'redux';
import axios from 'axios';
import { get, isEmpty } from 'lodash';
import Immutable from 'seamless-immutable';

import getFilteredBikes from '../helpers';

export const INITIAL_STATE = Immutable({
  bikes: [],
  loading: false,
  filteredBikes: [],
  search: '',
  startDate: '',
  endDate: '',
  error: null,
});

export const UPDATE_BIKES = 'reducer.updateBikes';
export const UPDATE_LOADER = 'reducer.updateLoader';
export const UPDATE_BIKE_INCIDENT = 'reducer.updateBikeIncident';
export const FILTER_BIKES_LIST = 'reducer.filterBikeList';
export const SERVICE_ERROR = 'reducer.updateServiceError';

export const updateBikeIncident = payload => ({
  type: UPDATE_BIKE_INCIDENT,
  payload,
});

export const updateBikes = payload => ({
  type: UPDATE_BIKES,
  payload,
});

export const updateLoader = payload => ({
  type: UPDATE_LOADER,
  payload,
});

export const filterBikeList = payload => ({
  type: FILTER_BIKES_LIST,
  payload,
});

export const updateServiceError = payload => ({
  type: SERVICE_ERROR,
  payload,
});

export const fetchBikes = () => async (dispatch, getState) => {
  if (!isEmpty(get(getState(), 'bikes.bikes'))) {
    return;
  }
  dispatch(updateServiceError(null));
  dispatch(updateLoader(true));
  try {
    const bikes = await axios.get('https://bikewise.org:443/api/v2/incidents');

    dispatch(updateBikes(bikes.data.incidents));
  } catch (err) {
    dispatch(updateServiceError(`${get(err, 'response.data.error')}. Try refreshing.` || 'Some issue occured please try refreshing.'));
  }

  dispatch(updateLoader(false));
};

export const fetchBikeDetail = incidentId => async (dispatch, getState) => {
  let bike = get(getState(), `bikes.incidents.${incidentId}`);

  if (!isEmpty(bike)) {
    return;
  }

  dispatch(updateServiceError(null));
  dispatch(updateLoader(true));
  try {
    bike = await axios.get(`https://bikewise.org:443/api/v2/incidents/${incidentId}`);
    dispatch(updateBikeIncident({ incident: bike.data.incident, incidentId }));
  } catch (err) {
    dispatch(updateServiceError(get(err, 'response.data.error')));
  }
  dispatch(updateLoader(false));
};

export const bikes = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_BIKES: return state
      .set('bikes', payload)
      .set('filteredBikes', payload)
      .set('error', null);
    case UPDATE_LOADER: return state.set('loading', payload);
    case UPDATE_BIKE_INCIDENT: {
      const { incident, incidentId } = payload;
      return state
        .update('incidents', incidents => Object.assign({}, incidents, { [incidentId]: incident }))
        .set('error', null);
    }
    case FILTER_BIKES_LIST: return state.set(
      'filteredBikes',
      getFilteredBikes(Object.assign({}, { bikes: state.bikes }, payload)),
    )
      .set('search', payload.search)
      .set('startDate', payload.startDate)
      .set('endDate', payload.endDate);
    case SERVICE_ERROR: return state.set('error', payload);
    default: return state;
  }
};

export default combineReducers({
  bikes,
});
