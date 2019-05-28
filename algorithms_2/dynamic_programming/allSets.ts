/**
 * return all subsets of a set.
 * 
 * solution 1
 * just initialize a set of one empty set [[]], cal it main set
 * then loop through input set, add current num to each and every one of the
 * main set (make new set, don't mutate the main set yet)
 * then add those new ones back into the main set
 * 
 * return main set;
 * 
 * time and space
 * time, you will be doubling the amount of sets in the main set
 * you can see that as a binary tree, and you are trying to get node count,
 * so branch**(depth + 1)
 * 2**n+1 or 2**n
 * space: simply 2**n
 */

export function getAllSet(nums) {
  return nums.reduce((mainSet, num) => {
    const newSets = mainSet.map((set) => {
      return [num, ...set];
    });
    mainSet.push(...newSets);
    return mainSet;
  }, [[]]);
}

describe('Get all sets', () => {
  it('should return [[]] for empty input set', () => {
    const arr = [];
    expect(getAllSet(arr)).to.eql([[]]);
  });
  it('should return [[], [1]] for input set with 1 value', () => {
    const arr = [1];
    expect(getAllSet(arr)).to.eql([[], [1]]);
  });
  it('should return correctly for input set of multiple numbers', () => {
    const arr = [1,2,3];
    expect(getAllSet(arr)).to.eql([[],[1],[2],[2,1],[3],[3,1],[3,2],[3,2,1]]);
  });
});