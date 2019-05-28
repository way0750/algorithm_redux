/**
 * A magic index in an array A[0... n-1] is defined to be an
 * index such that A[ i] = i. Given a sorted array of distinct
 * integers, write a method to find a magic index, if one exists,
 * in array A.
 * 
 * solution 1:
 * you can tell if there is a possible magic index by comparing
 * min and max index of an index range with value range (at min and max)
 * 
 * there is no possible magic index:
 * value: 5,6,7,8,9
 * index: 0,1,2,3,4
 * 
 * but there is one POTENTIAL one here:
 * value: 2,2,2,3,4
 * index: 0,1,2,3,4
 * because the value range from 2 to 4, and index range from 0 to 4
 * so:
 *        2.....4
 *     0........4
 *        |.....| the overlapping section where might be a magic index
 * once you have that overlapping section you can do binary search on it
 * having overlapping sections doesn't mean there will certainly a magic index
 * in that section, so you can end up searching min...mid  mid...max
 * use recursion for that
 * 
 * 
 * base case: if array is empty return -1 for nothing found;
 * what to always return: an integer as index, when it is -1 it means no index
 * what to do with return? if > -1 keep returning it
 * how to make problem smaller:
 *   get an overlapping section from the input array
 *   get mid point
 *   check point index and its value, if same return index
 *   else recursively call array with min index and max index
 * 
 * time and space complexity
 * this is just the same as merge sort, so NLogN
 * space: we are using recursion, so the depth: logN will be the amount of space
 * we will be using
 */

export function findMaigcIndex(arr = [], minIndex = 0, maxIndex = arr.length-1) {
  if (!arr.length) {
    return -1;
  }

  // get overlap section indexes:
  const minValue = arr[minIndex];
  const maxValue = arr[maxIndex];
  const newMinIndex = Math.max(minIndex, minValue);
  const newMaxIndex = Math.min(maxIndex, maxValue);

  if (newMinIndex > newMaxIndex) {
    return -1;
  }

  const midIndex = Math.floor(newMinIndex + (newMaxIndex - newMinIndex)/2);
  if (arr[midIndex] === midIndex) {
    return midIndex;
  } else {
    const resultOnLeft = findMaigcIndex(arr, newMinIndex, midIndex-1)
    if (resultOnLeft > -1) {
      return resultOnLeft;
    }
    const resultOnRight = findMaigcIndex(arr, midIndex+1, newMaxIndex);
    if (resultOnRight > -1) {
      return resultOnRight;
    }
    return -1;
  }
}

describe('Magic Index', () => {
  it('should return -1', () => {
    const arr = [7,8,9];
    expect(findMaigcIndex(arr)).to.eql(-1);
  });
  it('should return -1', () => {
    const arr = [-7,-8,-9];
    expect(findMaigcIndex(arr)).to.eql(-1);
  });
  it('should return 3', () => {
    //           0,1,2,3,4,5,6,7,8,9
    const arr = [3,3,3,3,3,3,3,3,3,3];
    expect(findMaigcIndex(arr)).to.eql(3);
  });
  it('should return 8', () => {
    //           0,1,2,3,4,5,6,7,8,9
    const arr = [3,3,3,8,8,8,8,8,8,9];
    expect(findMaigcIndex(arr)).to.eql(8);
  });
  it('should return 9', () => {
    //           0,1,2,3,4,5,6,7,8,9
    const arr = [3,3,3,8,8,8,8,8,9,9];
    expect(findMaigcIndex(arr)).to.eql(9);
  });
});