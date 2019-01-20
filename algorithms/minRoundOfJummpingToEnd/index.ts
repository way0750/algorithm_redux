/**
 * Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Your goal is to reach the last index in the minimum number of jumps.

Example:

Input: [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2.
    Jump 1 step from index 0 to 1, then 3 steps to the last index.

 */

/**
 * solution:
 * use dynamic programming to go from simplest cast: one element array to full array
 * and cache the min amount of jump required to reach each from that element/index
 * 
 * return the result from index 0
 * unless array is empty or last element is 0
 *   then return NaN
 */

export function minJump(numbers: Array<number>): number {
  if (!numbers.length || numbers[numbers.length - 1] < 1) {
    return NaN;
  }

  // for each index, loop same amount as the element/number
  // each loop make checkIndex = currentIndex + current loop number
  // use checkIndex to see if it exists in cache
  // if yes use cache[checkIndex] value
  // if no, you are out of bound, ignore that checkIndex and stop looping
  // at the end you might end up with multiple cache[checkIndex] value
  // pick the smallest one and save in cache
  const cache = numbers.reduceRight((record, curNum, indexFromRight) => {
    // already at last index, no need to do anything
    if (indexFromRight === numbers.length) {
      record[indexFromRight] = 0;
    }

    const loopLimit = numbers.length - indexFromRight
    for (let i = 1; i < loopLimit; i++) {
      const checkIndex = indexFromRight + i;
      const curMinJump = record[indexFromRight] || Infinity;
      record[indexFromRight] = Math.min(curMinJump, record[checkIndex]);
    }

    return record;
  }, {});

  return cache[0];
}

describe('Test min round of jummping to end', () => {
  it('Should return correctly for the example', () => {
    const numbers = [2,3,1,1,4];
    expect(minJump(numbers)).to.equal(2);
  });
  it('Should return correctly for the example', () => {
    const numbers = [2,3,1,1,4];
    expect(minJump(numbers)).to.equal(2);
  });
});