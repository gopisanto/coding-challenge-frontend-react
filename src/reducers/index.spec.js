import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

import {
  UPDATE_BIKES,
  UPDATE_BIKE_INCIDENT,
  FILTER_BIKES_LIST,
  SERVICE_ERROR,
  updateBikeIncident,
  updateBikes,
  filterBikeList,
  INITIAL_STATE,
  updateServiceError,
  UPDATE_LOADER,
  fetchBikes,
} from '.';
import reducer from '.';

const bikes = [
  {
    id: 1,
    description: 'Hero ranger is stolen at berlin station.',
    occurred_at: 1550012400, //13th Feb 2019
  },
  {
    id: 2,
    description: 'Blue byke is stolen at my home.',
    occurred_at: 1550185200, // 15th Feb 2019
  },
  {
    id: 3,
    description: 'Byke is stolen from my hand.',
    occurred_at: 1550271600, // 16th Feb 2019
  },
];

describe('Action creators', () => {
  test('updateBikeIncident', () => {
    const bike = { id:'1', description:'stolen bike' };

    const expectedAction = {
      type: UPDATE_BIKE_INCIDENT,
      payload: bike,
    };

    expect(updateBikeIncident(bike)).toEqual(expectedAction);
  });

  test('updateBikes', () => {
    const bikes = [
      { id:'1', description:'stolen bike' },
      { id:'2', description:'hero ranger' }
    ];

    const expectedAction = {
      type: UPDATE_BIKES,
      payload: bikes,
    };

    expect(updateBikes(bikes)).toEqual(expectedAction);
  });

  test('filterBikeList', () => {
    const payload = {search: 'byke', startDate: '2019-02-14', endDate: '2019-02-17'};

    const expectedAction = {
      type: FILTER_BIKES_LIST,
      payload,
    };

    expect(filterBikeList(payload)).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  test('fetchBikes', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { incidents: bikes }
      });
    });
    const store = configureMockStore([thunk])({ bikes: [] });
    const expectedActions = [
      { type: SERVICE_ERROR, payload: null },
      { type: UPDATE_LOADER, payload: true },
      { type: UPDATE_BIKES, payload: bikes },
      { type: UPDATE_LOADER, payload: false },
    ];

    return store.dispatch(fetchBikes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Reducers', () => {
  const bike = { id:'1', description:'stolen bike' };

  test('bikes', () => {
    const expectedResult = {
      'bikes': INITIAL_STATE.update(
          'incidents',
          incidents => Object.assign({}, incidents, { '1': bike }),
        )
      };

    expect(reducer(
      {'bikes': INITIAL_STATE},
      updateBikeIncident({ incident: bike, incidentId: '1' }))
    ).toEqual(expectedResult);
  });
});
