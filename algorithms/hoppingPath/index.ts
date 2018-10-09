/**
 * give an array of positive integers, each interger means how many steps you can hope forward at max
 * find out if you can hop all the way from index 0 to last index.
 * ex: [2,0,1,0], return true
 * at index 0, there is 2, that means you can hop forward 0/1/2 steps
 * if you hop 2 steps forward, you will land on index 2 with a integer of 1 which if you take number and hop
 * forward you will end up on index 3 which is the last index. return true for this config
 * 
 * 
 * 
 * solution 1
 * if you have an array like this:
 * [4, 3, 0, 0, 1, 0];
 *  0, 1, 2, 3, 4, 5
 * Instead of brute force it by coming up all the possible path and see if at lease 1 of them
 * can make it to th end, if you go backward and find out if certain index can make it to the end, then you
 * when go backward all the way to the first index, you will need very little computation and see if
 * any stepping will make it to an index with known valid path
 */

function isPathHoppable(numbers: Array<number>): any {
  const hopCache = Array(numbers.length);
  // go backward to search and keep hoppable record in hopCache
  for (let curIndex = numbers.length - 1; curIndex > -1; curIndex--) {
    // for the very last index, you don't need to do anything, you are already done
    // so just put true for hoppable there, as in, you can find a path
    const curHopNum = numbers[curIndex];
    if (curIndex === numbers.length - 1) {
      hopCache[curIndex] = true;
    } else {
      // here, loop by same amount as curHopNum, and see if from current step
      // we can hop to a step that has been proven to lead to a complete path

      // initialize the hopeCache for current index to false first
      hopCache[curIndex] = false;
      let forwardCount = 1;
      // loop condition: forwardCount is a way to keep track to how many steps we should use from
      // the curNum, if the curNum is 4, then we can these options: 1/2/3/4, we will loop through all of them and no more
      // In addition to that, if anything any of the stepping will lead to an out of bound index, stop
      // Or if anytime we should a valid path, stop
      while (forwardCount <= curHopNum && curHopNum + forwardCount < numbers.length && hopCache[curIndex] === false) {
        const foundValidSubseqPath = hopCache[curHopNum + forwardCount];
        if (foundValidSubseqPath) {
          hopCache[curIndex] = foundValidSubseqPath;
        } else {
          forwardCount++;
        }
      }
    }
  }

  // return whatever is found so far
  return !!hopCache[0];
}

describe('hopping path', () => {
  it('should return true for the example path', () => {
    const numbers = [2, 0, 1, 0];
    expect(isPathHoppable(numbers)).to.be.true;
  });

  it('should return true for a config that has multiple valid paths too', () => {
    const numbers = [4, 3, 0, 0, 1, 0];
    expect(isPathHoppable(numbers)).to.be.true;
  });

  it('should return false for empty path', () => {
    expect(isPathHoppable([])).to.be.false;
  });

  it('should return false for long and invalid config', () => {
    const numbers = [1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 10];
    expect(isPathHoppable(numbers)).to.be.false;
  });

  it('should return false for config that begings with a 0', () => {
    const numbers = [0, 2, 3, 4, 5, 0, 0, 10];
    expect(isPathHoppable(numbers)).to.be.false;
  });
});