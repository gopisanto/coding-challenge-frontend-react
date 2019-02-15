import { combineReducers } from 'redux';
import axios from 'axios';

const INITIAL_STATE = {
  bikes: null,
};

const UPDATE_BIKES = 'reducer.updateBikes';

export const updateBikes = payload => ({
  type: UPDATE_BIKES,
  payload,
});

export const fetchBikes = () => async (dispatch) => {
  const bikes = await axios.get('https://bikewise.org:443/api/v2/incidents?page=1');

  dispatch(updateBikes(bikes));
};

export const bikes = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  if (type === UPDATE_BIKES) {
    return Object.assign({}, state, { bikes: payload });
  }

  return state;
};

export default combineReducers({
  bikes,
});
