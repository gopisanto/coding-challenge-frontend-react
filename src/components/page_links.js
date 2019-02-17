import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { range, map } from 'lodash';

const PageLinks = ({
  totalRecords, noOfRecordsPerPage, pageClickHandler, selectedPage,
}) => {
  if (!totalRecords || !noOfRecordsPerPage) {
    return null;
  }

  const [activePage, setActivePage] = useState(selectedPage);
  const noOfPages = Math.ceil(totalRecords / noOfRecordsPerPage);

  function handlePageClick(event) {
    setActivePage(parseInt(event.target.value, 10));
    pageClickHandler(parseInt(event.target.value, 10));
  }

  function onNext() {
    setActivePage(activePage + 1);
    pageClickHandler(activePage + 1);
  }

  function onPrev() {
    setActivePage(activePage - 1);
    pageClickHandler(activePage - 1);
  }

  function onLast() {
    setActivePage(noOfPages);
    pageClickHandler(noOfPages);
  }

  function onFirst() {
    setActivePage(1);
    pageClickHandler(1);
  }

  return (
    <div className="page-links">
      <button onClick={onFirst} disabled={noOfPages < 2 || activePage === 1}>{'<< First'}</button>
      <button onClick={onPrev} disabled={noOfPages < 2 || activePage === 1}>{'< Prev'}</button>
      {
        map(
          range(1, noOfPages + 1),
          index => <button value={index} key={index} disabled={index === activePage} onClick={handlePageClick}>{index}</button>,
        )
      }
      <button onClick={onNext} disabled={noOfPages < 2 || activePage === noOfPages}>{'Next >'}</button>
      <button onClick={onLast} disabled={noOfPages < 2 || activePage === noOfPages}>{'Last >>'}</button>
    </div>
  );
};

PageLinks.propTypes = {
  totalRecords: PropTypes.number,
  noOfRecordsPerPage: PropTypes.number,
  pageClickHandler: PropTypes.func,
  selectedPage: PropTypes.number,
};

PageLinks.defaultProps = {
  pageClickHandler: () => null,
  selectedPage: 1,
  totalRecords: 0,
  noOfRecordsPerPage: 10,
};

export default PageLinks;
