import React from 'react';
import renderer from 'react-test-renderer';

import PageLinks from './page_links';

describe('<PageLinks />', () => {
  test('renders links to each page', () => {
    const component = renderer.create(<PageLinks totalRecords={35} noOfRecordsPerPage={10} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  test('all navigations are disabled when there is only 1 page', () => {
    const component = renderer.create(<PageLinks totalRecords={5} noOfRecordsPerPage={10} />).toJSON();

    expect(component).toMatchSnapshot();
  })
});
