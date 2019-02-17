import React from 'react';
import renderer from 'react-test-renderer';

import NoData from './no_data';

it('renders correctly', () => {
  const component = renderer.create(<NoData />).toJSON();

  expect(component).toMatchSnapshot();
});

it('renders correctly when custom message passed', () => {
  const component = renderer.create(<NoData message="No records found." />).toJSON();

  expect(component).toMatchSnapshot();
});
