import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';

import StolenBikes from './stolen_bikes';
import { INITIAL_STATE, updateLoader, fetchBikes } from '../reducers';

Enzyme.configure({ adapter: new Adapter() });

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

describe('<StolenBikes />', () => {
  let store, container;

  beforeEach(() => {
    store = configureMockStore([thunk])({ bikes: [] });
    container = renderer.create(<StolenBikes store={store} />).toJSON();
  });

  test('renders loading screen', () => {
    expect(container).toMatchSnapshot();
    store.dispatch(updateLoader(true));
    expect(container).toMatchSnapshot();
  });

  test('renders bikes list', () => {
    expect(container).toMatchSnapshot();

    return store.dispatch(fetchBikes()).then(() => {
      expect(container).toMatchSnapshot();
    });
  })
});
