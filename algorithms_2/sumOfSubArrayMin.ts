/*
  Given an array of integers A, find the sum of min(B), where B ranges over every (contiguous) subarray of A.

  Since the answer may be large, return the answer modulo 10^9 + 7.

  Example 1:

  Input: [3,1,2,4]
  Output: 17
  Explanation: Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
  Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.  Sum is 17.

  solution 1:
  loop through each number
  for each num, create sub array from there and on
  keep record of current min

  time and space:
  time, this is going to be n
  space: O(1), you just need to keep sum and curMin;
 */

export function sumSubarrayMins(nums: Array<number>) {
  return nums.reduce((sum, num, startIndex) => {
    let curMin = Infinity;
    for (let curIndex = startIndex; curIndex < nums.length; curIndex++) {
      curMin = Math.min(curMin, nums[curIndex]);
      sum += curMin;
    }
    return sum;
  }, 0);
}

describe('Sum of sub array mins', () => {
  it('should return 17 for example', () => {
    const nums = [3,1,2,4];
    expect(sumSubarrayMins(nums)).to.eql(17);
  });
  it('should return 17 for example', () => {
    const nums = [1,1,1,1];
    expect(sumSubarrayMins(nums)).to.eql(10);
  });
});