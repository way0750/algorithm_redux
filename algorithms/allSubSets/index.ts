// import _ from 'lodash';
const _ = require('lodash');
// const _ = import('lodash');
// The power set of a set is the set of all its subsets. Write a function that, given a set, generates its power set.
// For example, given the set {1, 2, 3}, it should return {{}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}.

/**
 * been there done that, all you got to do is make a copy of all current sub sets, add one element into each of the sub set copy
 * repeat until you have gone through all the elements
 * by default start with an empty set
 */

export function makeAllSubsets(set: Array<number>): Array<Array<number>> {
  const curSubsets = [[]];
  set.forEach((num: number) => {
    const newSubsets = curSubsets.map((subset: Array<number>) => [num, ...subset]);
    curSubsets.push(...newSubsets);
  });
  return curSubsets;
}

function makeAllSubsetsRedux(set: Array<number>): Array<Array<number>> {
  return set.reduce((curSubsets: Array<Array<number>>, num: number) => {
    const newSubsets = curSubsets.map((subset: Array<number>) => [num, ...subset]);
    return [...curSubsets, ...newSubsets];
  }, [[]]);
}

const isArrsEql = (arr1, arr2) => {
  return arr1.length !== arr2.length ? false : !_.difference(arr1, arr2).length;
}

const isDifferenceWith = (set1, set2) => {
  if (set1.length !== set2.length) {
    return false;
  } else {
    return !_.differenceWith(set1, set2, isArrsEql).length;
  }
}

describe('Make All Subsets', () => {
  it('should return expect result for example above', () => {
    const set = [1, 2, 3];
    const result = makeAllSubsets(set);
    const expected = [
      [],
      [1],
      [2],
      [3],
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 2, 3],
    ];
    expect(isDifferenceWith(expected, result)).to.be.true;
  });

  it('should return as expected for falsy check', () => {
    const set = [1, 2, 3];
    const result = makeAllSubsets(set);
    const expected = [
      [99999999999],
      [1],
      [2],
      [3],
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 2, 3],
    ];
    expect(isDifferenceWith(expected, result)).to.be.false;
  });

  it('should return array of one empty array for empty input', () => {
    const set = [];
    const result = makeAllSubsets(set);
    const expected = [
      []
    ];
    expect(isDifferenceWith(expected, result)).to.be.true;
  });

  it('should return correct sub sets for [4,5,6,7]', () => {
    const set = [4, 5, 6, 7];
    const result = makeAllSubsets(set);
    const expected = [
      [],
      [4],
      [5],
      [5, 4],
      [6],
      [6, 4],
      [6, 5],
      [6, 5, 4],
      [7],
      [7, 4],
      [7, 5],
      [7, 5, 4],
      [7, 6],
      [7, 6, 4],
      [7, 6, 5],
      [7, 6, 5, 4],
    ];
    expect(isDifferenceWith(expected, result)).to.be.true;
  });
});