/**
 * Number of Paths You’re testing a new driverless car that is located at the
 * Southwest (bottom-left) corner of an n×n grid. The car is supposed to
 * get to the opposite, Northeast (top-right),
 * corner of the grid. Given n, the size of the grid’s axes, write
 * a function numOfPathsToDest that returns the number of the possible
 * paths the driverless car can take.
 * 
 * For convenience, let’s represent every square in the grid as a pair (i,j). The first coordinate in the pair denotes the east-to-west axis, and the second coordinate denotes the south-to-north axis. The initial state of the car is (0,0), and the destination is (n-1,n-1).

The car must abide by the following two rules: it cannot cross the diagonal border. In other words, in every step the position (i,j) needs to maintain i >= j. See the illustration above for n = 5. In every step, it may go one square North (up), or one square East (right), but not both. E.g. if the car is at (3,1), it may go to (3,2) or (4,1).

 * Explain the correctness of your function, and analyze its time and space
 * complexities.

 input:  n = 4
 output: 5

 see the image for more ideas

 this is basically the same as other dynamic programming challenges
 get one 1-d cache array and set it to all 0s, but the last one 1
 loop through each sub array from top of matrix to bottom
 each loop update the cache array value with value from immediate right
 plus self

 when done, return that cacheArray[0]; 


 or use recursion
 time n**2
 space n which is the same as the previous solution anyway

  go from bottom left to top right
  can only move horizontal or vertical
  horizontal axis: i
  vertical axis: j
  i>=j
  meaning every single has to be be 
  you can't go to far up then right side
             
  final pos: i: 4, j: 4

  n = 4
  0,0 -> 3,3
  
  3,3
  (2,3) (3,2)
  
  3,2
  2,2 3,1
  
  2,2
  
  3,1
  
  
  keep on asking until you hit starting point of 0,0
  
  use recursion to solve this:
  base case:
    two situation:
      pos: 0,0 meaning we are all the way back at the beginning: pos
        so that mena we found at least one valid path
        so return 1
      pos: -1,0, 0,-1
        we are out of bound, return 0 for finding an in valid path
      pos i < j return 0
  what to always returns
    always return a number
  what to do with returns
    since we will be creating 2 new pos each time, and we will recursively call on those
    new positions, we are trying to find all possible valid paths
    we will be summing all the return from those 2 new pos
  how to make problem smaller:
    current pos eith i-1, j; or i, j-1
    becareful here: only recursively call the one that's i = j
*/

function getValidPathsFromPos(i, j){
  if (i < j || i < 0 || j < 0) {
    return 0;
  } else if (i==0 && j==0){
    return 1;
  }
    
  // recursive search here:
  return getValidPathsFromPos(i - 1, j) + getValidPathsFromPos(i, j - 1);
}
 
export function numOfPathsToDest(n) {
  return getValidPathsFromPos(n-1, n-1);
}

describe('numberOfPaths', () => {
  it('should return 0 for n = 0', () => {
    expect(numOfPathsToDest(0)).to.eql(0);
  });
  it('should return 1 for n = 1', () => {
    expect(numOfPathsToDest(1)).to.eql(1);
  });
  it('should return 5 for n = 4', () => {
    expect(numOfPathsToDest(4)).to.eql(5);
  });
  it('should return 14 for n = 5', () => {
    expect(numOfPathsToDest(5)).to.eql(14);
  });
});