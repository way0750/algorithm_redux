const arr  = [1,3,6,4,1,2];
/**
 * sort it first?
 * set firstMissingNum to 1
 * there might be negative numbers
 * but loop the array
 * when number is less than 1 don't do anything
 * when number is larger than 0 that's when you start to compare
 *   curNum == firstMissingNum ?
 *   yes then firstMissingNum++
 *   no then you have found it
 */

// function solution(arr) {
//   arr = arr.sort((n1, n2) => n1 > n2);
//   let firstMissingNum = 1;
//   const foundMissing = arr.findIndex((num) => {
//     if (num < 1) {
//       return false;
//     } else {
//       const found = firstMissingNum < num;
//       if (firstMissingNum === num) {
//         firstMissingNum++;
//       }
//       return found;
//     }
//   });
//   if (foundMissing > -1) {
//     return firstMissingNum;
//   } else {
//     const lastNum = arr[arr.length-1];
//     return lastNum < 0 ? 1 : lastNum + 1;
//   }
// }

function solution(stoneTimes, maxJumpDist) {
  if (maxJumpDist >= stoneTimes.length) {
      return 0;
  }
  // sort the stoneTimes by time 
  const sortedStoneTimes = stoneTimes.slice().sort((n1, n2) => n1 > n2);
  sortedStoneTimes.forEach((searchTime) => {
      if (searchTime > -1) {
          // max reach index
          let maxReach = maxJumpDist - 1;
          let curPos = 0;
          while (curPos <= maxReach) {
              const curStoneApearTime = stoneTimes[curPos];
              if (curStoneApearTime > -1 && searchTime >= curStoneApearTime) {
                  maxReach = maxJumpDist + curPos;
              }
              if (maxReach >= stoneTimes.length) {
                  return searchTime;
              }
              curPos++;
          }
      }
  });
  return -1;
}

describe('test', () => {
  it('1', () => {
    expect(solution([1,-1,0,2,3,5], 3)).to.eql(2);
  });
  it('1', () => {
    expect(solution([1,-1,0,2,3,5], 3)).to.eql(2);
  });
});