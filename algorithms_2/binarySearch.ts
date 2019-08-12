/**
 * noting but the good old binary search..
 * sorted array of integers, give a targe, find it
 */

function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  while(end>=start) {
    let mid = start + Math.floor((end-start)/2);
    const midNum = arr[mid];
    if (midNum === target) {
      return true;
    } else if (midNum < target) {
      // move the search range to the right
      start = mid + 1;
    } else {
      // mid > target
      end = mid - 1;
    }
  }

  return false;
}

describe('Binary Search', () => {
  it('should return correctly for emtpy array target: 4', () => {
    const arr = [];
    const target  = 4;
    expect(binarySearch(arr, target)).to.false;
  });
  it('should return correctly for 1,2,3,4,5,6,7,8 target: 4', () => {
    const arr = [1,2,3,4,5,6,7,8];
    const target  = 4;
    expect(binarySearch(arr, target)).to.true;
  });
  it('should return correctly for 1,2,3,4,5,6,7,8 target: 14', () => {
    const arr = [1,2,3,4,5,6,7,8];
    const target  = 14;
    expect(binarySearch(arr, target)).to.false;
  });
  it('should return correctly for 11 target: 11', () => {
    const arr = [11];
    const target  = 11;
    expect(binarySearch(arr, target)).to.true;
  });
  it('should return correctly for 11 target: 11', () => {
    const arr = [11];
    const target  = 11;
    expect(binarySearch(arr, target)).to.true;
  });
});