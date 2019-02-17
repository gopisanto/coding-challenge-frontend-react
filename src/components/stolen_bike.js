import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const StolenBike = ({
  data: {
    media: { image_url_thumb: imageURL } = {},
    title,
    description,
    occurred_at: occuredAt,
    updated_at: updatedAt,
    location_description: location,
    id,
  },
  showDetail,
}) => (
  <div className="stolen-bike-detail">
    <img src={imageURL} alt="title" />
    <div className="description">
      {
        showDetail
          ? <Link to={`/incident/${id}`}><h4>{title}</h4></Link>
          : <h4>{title}</h4>
      }
      <p>{description}</p>
      <div className="time-location">
        <label>Date of Theft:- {moment(occuredAt * 1000).format('Do MMMM, YYYY')}</label>
        <label>Reported on  :- {moment(updatedAt * 1000).format('Do MMMM, YYYY')}</label>
        {(location || true) && <label>Location:- {location}</label>}
      </div>
    </div>
  </div>
);

StolenBike.propTypes = {
  data: PropTypes.object,
  showDetail: PropTypes.bool,
};

StolenBike.defaultProps = {
  data: {},
  showDetail: true,
};

export default StolenBike;
