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

// this idea has yet been verified:
/**
 * What is the numbers list is a list of unque positive integers that increment by 1?
 * for ex: [1, 2, 3, 4, 5, 6] and k = 9
 * this should return [2, 3, 4];
 * since 2, 3, 4, they each increment by 1
 * visualize it:
 *     .
 *   . .
 * . . .
 * . . .
 * 
 * the area / sum of this shape is k, 9
 * 
 * you can get its area by copy itself and flip upside down and add to original self, then you get a rectangle,
 * get the area of this rectangle and divide by 2, it is 9
 * 
 * o o o
 * o o o
 * o o .
 * o . .
 * . . .
 * . . .
 * getting the area of this rectangle:
 * starting value + ending value: (2 + 4) 
 * multiple by the length of this range: 3
 * ( 2 + 4 ) * 3 = 18
 * 18 / 2 = 9
 * 
 * in a formular: ( s + e ) * (e + 1 - s) = 2k
 * 
 * with this idea, as we loop through the numbers, we know which number in the list we will need to have a pair
 * of s + e to sum up to 2k
 * if e is a interger that is smaller/equal to the last number in the number list, then yes we can make a sub list
 * 
 * how to get e for each s:
 *  
 */