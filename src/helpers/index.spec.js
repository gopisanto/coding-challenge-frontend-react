import getFilteredBikes from '.';

console.log = s => process.stdout.write(s + "\n");

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

describe('getFilteredBikes', () => {
  test('should not filter bikes when all criteria is empty', () => {
    expect(getFilteredBikes({bikes}).length).toEqual(3);
  });
  test('should filter bikes based on description', () => {
    expect(getFilteredBikes({bikes, search: 'byke'}).length).toEqual(2);
  });
  test('should filter bikes based on description and dates', () => {
    expect(getFilteredBikes({bikes, search: 'byke', startDate: '2019-02-14'}).length).toEqual(2);
  });
});
