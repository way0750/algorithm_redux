// Given a list of integers and a number K, return which contiguous elements of the list sum to K.
// For example, if the list is [1, 2, 3, 4, 5] and K is 9, then it should return [2, 3, 4].

/**
 * are there negative numbers in the list?
 * the number list going to be sorted?
 * are there duplicated numbers?
 * 
 * if they are sorted, and there are only pasitive numbers, and there are duplicated nubmers:
 * if the first number is already bigger than K, return empty array []
 * else
 * maintain two pointers ;
 * pointers front: P_Front start at 0, and pointers back P_Back starts at 0
 * declar a varible: curSum, and assign 0 to it 
 * as P_Front move from index 0 forward, add the number at P_Front to curSum 
 *   then ask if the curSum is equal to K, if yes return subArray from P_Back..P_Front+1
 *   else if curSum larger than curSum, then curSum -= number at P_Back, then P_Back++
 * 
 * return default [];
 */

function contiguousSumToK1(nums: Array<number>, k: number) {
  if (nums.length == 0 || nums[0] > k) {
    return [];
  }
  let curSum = 0;
  let P_Front = 0;
  let P_Back = 0;
  while (P_Front < nums.length) {
    if (curSum === k) {
      return nums.slice(P_Back, P_Front);
    } else if (curSum > k) {
      curSum -= nums[P_Back];
      P_Back++;
    } else if (curSum < k) {
      curSum += nums[P_Front];
      P_Front++;
    }
  }

  // return default for no sub list found to be able to sum to k
  return [];
}

describe('potentially duplicated, sorted, positive numbers', () => {
  it('empty array return empty array', () => {
    const nums = [];
    const subList = contiguousSumToK1(nums, 12);
    expect(subList).to.deep.equal([])
  });
  it('list start with number that is already too big, return empty arrray for no possible', () => {
    const nums = [10, 11, 12, 13];
    const subList = contiguousSumToK1(nums, 2);
    expect(subList).to.deep.equal([])
  });
  it('long list of number, return sublist', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const subList = contiguousSumToK1(nums, 12);
    expect(subList).to.deep.equal([3, 4, 5])
  });
  it('duplicated numbers', () => {
    const nums = [1, 2, 3, 3, 3, 3, 3, 4, 5, 6, 7, 8, 9];
    const subList = contiguousSumToK1(nums, 21);
    expect(subList).to.deep.equal([2, 3, 3, 3, 3, 3, 4])
  });
  it('no sub list found', () => {
    const nums = [1, 2, 3, 3, 3, 3, 3, 4, 5, 6, 7, 8, 9];
    const subList = contiguousSumToK1(nums, 29);
    expect(subList).to.deep.equal([])
  });
});