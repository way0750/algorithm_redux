// Given a pivot x, and a list lst, partition the list into three parts.
// The first part contains all elements in lst that are less than x
// The first part contains all elements in lst that are equal to x
// The first part contains all elements in lst that are larger than x
// Ordering within a part can be arbitrary.
// For example, given x = 10 and lst = [9, 12, 3, 5, 14, 10, 10], one partition may be [9, 3, 5, 10, 10, 12, 14]a

/**
 * solution, loop the array twice, from front to back and then back to front
 * first loop, keep 2 pointers, one is next swappable index for a number that is smaller than x
 *   and then a pointer to keep moving forward to check the value of each number against x
 * second loop, keep 2 pointers, one is next swappable index for a number that is larger than x
 *   set that pointer to last index
 *   and then a pointer to keep moving backward to check the value of each number against x
 */

export function sortArray(nums: Array<number>, x) {
  let swapIndexFromLeft = 0;
  for (let i = 0; i < nums.length; i++) {
    const curNum = nums[i];
    if (curNum < x) {
      nums[i] = nums[swapIndexFromLeft];
      nums[swapIndexFromLeft] = curNum;
      swapIndexFromLeft++;
    }
  }
  ;
  let swapIndexFromRight = nums.length - 1;
  for (let i = nums.length - 1; i > -1; i-- ) {
    const curNum = nums[i];
    if (curNum > x) {
      nums[i] = nums[swapIndexFromRight];
      nums[swapIndexFromRight] = curNum;
      swapIndexFromRight--;
    }
  }

  return nums;
}