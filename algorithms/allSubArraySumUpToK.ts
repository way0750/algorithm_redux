/**
 * give an array of integers and k
 * return all the sub array that can be sum up to k
 * 
 * solution 1:
 * set a hash to record running sum and each running sum's value is an array indexes
 * set curSum to 0
 * set allPatterns to [];
 * then loop through the input array
 *   and add to curSum
 *   push current index to hash[curSum]'s array
 *   now now now....
 *   hash[curSum - k] does this return anything?
 *     if yes, then you have found patterns
 *     loop through each patterns(indexes) and slice those index to current index
 *       put that sub array into allPatterns
 * 
 * 
 * return allPatterns;
 * 
 * time and space
 * time:
 * if you can create a sub pattern with every single index...
 *   so for each index, index**2 amount of pattern
 *   total it would be !n**2, jesus....
 * space: same as time
 *   that is a lot of space
 */

export function allSubArrays(nums: Array<number>, k) {
  let runningSum = 0;
  const cache = { 0: [-1] };
  const allPatterns = [];
  nums.forEach((num, index) => {
    runningSum += num;
    cache[runningSum] = cache[runningSum] || [];
    cache[runningSum].push(index);
    const subPatterns = cache[runningSum - k];
    if (subPatterns) {
      subPatterns.forEach((patIndex) => {
        const startIndex = patIndex + 1;
        const endIndex = index + 1;
        // during const subPatterns = cache[runningSum - k];
        // you might end up getting a value that's the same as the current index
        // that would end up giving you and empty array during slicing
        if (startIndex !== endIndex) {
          allPatterns.push(nums.slice(startIndex, endIndex));
        }
      });
    }
  });

  return allPatterns;
}

describe('all sub array sum up to k', () => {
  it('should return all possible patterns for all 0s and k = 0', () => {
    const nums = [0,0,0,0,0,0];
    const k = 0;
    const results = allSubArrays(nums, k);
    const expected = [
      [0], // the first 0
      [0,0],
      [0], // the second 0
      [0,0,0],
      [0,0],
      [0], // the third 0
      [0,0,0,0],
      [0,0,0],
      [0,0],
      [0], // the forth 0
      [0,0,0,0,0],
      [0,0,0,0],
      [0,0,0],
      [0,0],
      [0], // the fifth 0
      [0,0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0],
      [0,0,0],
      [0,0],
      [0] // the last 0
    ];
    expect(expected).to.eql(results);
  });

  it('should return correctly', () => {
    const nums = [10,7,-17,17,-17,17,-17,21,-21,4,0];
    const k = 4;
    const result = allSubArrays(nums, k);
    const expected = [
      [-17,17,-17,17,-17,21],
      [-17,17,-17,21],
      [-17,21],
      [10,7,-17,17,-17,17,-17,21,-21,4],
      [17,-17,17,-17,21,-21,4],
      [17,-17,21,-21,4],
      [21,-21,4],
      [4],
      [10,7,-17,17,-17,17,-17,21,-21,4,0],
      [17,-17,17,-17,21,-21,4,0],
      [17,-17,21,-21,4,0],
      [21,-21,4,0],
      [4,0]
    ];
    expect(result).to.eql(expected);
  });
});