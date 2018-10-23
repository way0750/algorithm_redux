function solution1(nums) {
  const uniqCache = {};
  let positiveNums = nums.filter((num) => {
    if (!uniqCache.hasOwnProperty(num) && num > 0) {
      uniqCache[num] = num;
      return true;
    } else {
      return false;
    }
  });
  // to deal with empty array;
  positiveNums = positiveNums.length ? positiveNums : [];
  const sortedNums = positiveNums.sort();
  const foundIndex = sortedNums.findIndex((num, index) => { return num !== index + 1});
  return foundIndex === -1 ? sortedNums.length + 1 : sortedNums[foundIndex - 1] + 1;
}

describe('temp test', () => {
  it('should return example', () => {
  const arr = [1, 3, 6, 4, 1, 2];
  const result = solution1(arr);
  expect(result).to.equal(5);
  });

  it('should deal with negative numbers', () => {
  const arr = [-1, -3];
  const result = solution1(arr);
  expect(result).to.equal(1);
  });
});


function solution(nums) {
  const maxVar = nums.length/2;
  const uniqNumCache = {};
  let uniqNumsCount = 0;
  for (let i = 0; i < nums.length; i++) {
    const found = uniqNumCache[nums[i]];
    if(!found) {
      uniqNumCache[nums[i]] = true;
      uniqNumsCount++;
      if (uniqNumsCount === maxVar) {
        return uniqNumsCount
      }
    }
  }
  return uniqNumsCount;
}

describe('check', () => {
  it('chec', () => {
    const arr = [3, 4, 7, 7, 6, 6] ;
    expect(solution(arr)).to.equal(3);
  });
  it('chec 002', () => {
    const arr = [80, 80, 1000000000, 80, 80, 80, 80, 80, 80, 123456789];
    expect(solution(arr)).to.equal(3);
  });
});