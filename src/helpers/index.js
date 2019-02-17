import { filter, isEmpty } from 'lodash';

const getFilteredBikes = ({
  bikes = [],
  search,
  startDate,
  endDate,
}) => {
  if (isEmpty(search) && isEmpty(startDate) && isEmpty(endDate)) {
    return bikes;
  }
  const filteredBikes = filter(bikes, (bike) => {
    const replacedTerm = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regex = new RegExp(replacedTerm, 'i');

    return regex.test(bike.description)
      && (isEmpty(startDate) || new Date(bike.occurred_at * 1000) >= new Date(startDate))
      && (isEmpty(endDate) || new Date(bike.occurred_at * 1000) <= new Date(endDate));
  });

  return filteredBikes;
};

export default getFilteredBikes;
