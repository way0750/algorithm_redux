/**
 * Find the Missing Number in a sorted array
 * range starts at 1
 * there will be no duplicated numbers
 * ex: [1,2,3,4,6,7,8]
 * 
 * some observation:
 * the index and value: the value should be +1 than index
 * so essentially, your job is to find the first element that is not that case
 * use binary search to get that, and remember you need to find the first
 * element meets that criteria: value - index > 1
 * all you have to do is: whenever you find value - index > 1, you also look
 * at the immediate left and see if that the case too, if yes, then you still
 * have to keep going.
 */

 // [1,2,3,4,6,7,8]
 //  0 1 2 3 4 5 6
export function FindFirstMissing(nums) {
  let minIndex = 0;
  let maxIndex = nums.length - 1;
  while(minIndex <= maxIndex) {
    const midIndex = minIndex + Math.floor((maxIndex - minIndex) / 2);
    const midValue = nums[midIndex];

    const leftIndex= midIndex - 1
    const leftValue = nums[leftIndex];

    if ((midValue - midIndex) > 1 && (leftValue - leftIndex) === 1) {
      return midIndex + 1;
    } else if ((midValue - midIndex) > 1 && (leftValue - leftIndex) > 1) {
      maxIndex = midIndex - 1;
    } else {
      minIndex = midIndex + 1;
    }
  }

  return nums.length + 1;
}

describe('Testing finding missing numbers', () => {
  it('should work with the example: 1,2,3,4,6,7,8', () => {
    const nums = [1,2,3,4,6,7,8];
    expect(FindFirstMissing(nums)).to.eql(5);
  });
  it('should return 8 for 1,2,3,4,5,6,7', () => {
    const nums = [1,2,3,4,5,6,7];
    expect(FindFirstMissing(nums)).to.eql(8);
  });
  it('should return 1 for empty array', () => {
    const nums = [];
    expect(FindFirstMissing(nums)).to.eql(1);
  });
});