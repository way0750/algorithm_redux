/**
 * K-Messed Array Sort
 * Given an array of integers arr where each element is at most k places away
 * from its sorted position, code an efficient function sortKMessedArray that
 * sorts arr. For instance, for an input array of size 10 and k = 2, an element
 * belonging to index 6 in the sorted array will be located at either index 4,
 * 5, 6, 7 or 8 in the input array. Analyze the time and space complexities of your solution.
 * Example:
 * input:  arr = [1, 4, 5, 2, 3, 7, 8, 6, 10, 9], k = 2
 * output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * 
 * solution 1:
 * each element is at most k indexes away from current index
 * another way to look at it would be: if current element is at the wrong index
 * the element that should be at current index would be at most k indexes away
 * staring from left to right of the array, k indexes can only be k indexes on
 * right side of the current element
 * 
 * so loop from left to right, get k + 1 element + 1 means including current one
 * and then just compare and get the smallest value and push it in an holding array
 * 
 * then return the holding array
 * 
 */

function sortKMessedArray(array, k) {
  array = array.slice();
  const sortedArray = [];
  // don't want to mutate the input
  let loopCount = array.length;
  const kSubArray = array.splice(0, k+1);
  while (loopCount--) {
    const curSmallestVal = Math.min(...kSubArray);
    sortedArray.push(curSmallestVal);

    const removeIndex = kSubArray.indexOf(curSmallestVal);
    kSubArray.splice(removeIndex, 1);
    if (array.length) {
      kSubArray.push(array.shift());
    }
  }

  return sortedArray;
}

describe('k messed array', () => {
  it('should work with example above:', () => {
    const arr = [1, 4, 5, 2, 3, 7, 8, 6, 10, 9];
    const k =2;
    expect(sortKMessedArray(arr, k)).to.eql([1,2,3,4,5,6,7,8,9,10]);
  });
});