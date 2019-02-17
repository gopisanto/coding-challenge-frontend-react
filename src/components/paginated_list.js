import React from 'react';
import PropTypes from 'prop-types';
import { slice, isEmpty } from 'lodash';

import PageLinks from './page_links';

const getPageData = (data, currentPage, noOfRecordsPerPage) => {
  if (isEmpty(data)) {
    return [];
  }
  const startIndex = ((currentPage - 1) * noOfRecordsPerPage);
  const endIndex = currentPage * noOfRecordsPerPage;

  return slice(data, startIndex, endIndex);
};

class PaginatedList extends React.Component {
  constructor(props) {
    super(props);
    this.pageClickHandler = this.pageClickHandler.bind(this);
    this.state = { currentPage: 1, noOfRecordsPerPage: props.noOfRecordsPerPage || 10 };
  }

  pageClickHandler(pageSelected) {
    this.setState({ currentPage: pageSelected });
  }

  render() {
    const { itemRenderer: ItemRenderer, data } = this.props;
    const { currentPage, noOfRecordsPerPage } = this.state;
    const pageData = getPageData(data, currentPage, noOfRecordsPerPage);

    return (
      <div className="paginated-list">
        <ul>
          { pageData.length > 0 && pageData.map(detail => <li key={detail.id}><ItemRenderer data={detail} /></li>) }
        </ul>
        <PageLinks totalRecords={data.length} noOfRecordsPerPage={noOfRecordsPerPage} pageClickHandler={this.pageClickHandler} />
      </div>
    );
  }
}

PaginatedList.propTypes = {
  data: PropTypes.array,
  itemRenderer: PropTypes.func,
  noOfRecordsPerPage: PropTypes.number,
};

PaginatedList.defaultProps = {
  data: [],
  itemRenderer: data => <li>{data.id}</li>,
  noOfRecordsPerPage: 10,
};

export default PaginatedList;
