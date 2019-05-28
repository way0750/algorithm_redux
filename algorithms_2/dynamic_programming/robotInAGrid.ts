/**
 * Robot in a Grid: Imagine a robot sitting on the upper left corner
 * of grid with r rows and c columns. The robot can only move in
 * two directions, right and down, but certain cells are "off limits"
 * such that the robot cannot step on them. Design an algorithm to
 * find a path for the robot from the top left to the bottom right.
 * 
 * solution 1: not using dynamic programming:
 * just simply use recursion to search all possible path
 * base case: current cell is the last cell of the matrix
 *   return [cell], this is a path
 *   or if current cell is a block or undefined, return []
 * what to always return: an array, it is a path. there may or may not be
 * anything in it.
 * what to do with return, if there is a length, then add self
 *   otherwise just return []
 * how to make problem smaller:
 * call right see if there is a path,
 * if there isn't, call bottom too
 * 
 * time and space
 * time: we will go through each and every single cell, so N*M
 * space: N+M because you can only go right or bottom
 * so the possible path will always be N + M
 */ 

export function search(matrix, rowIndex, columnIndex) {
  const curRow = matrix[rowIndex] || [];
  const curCell = curRow[columnIndex];
  const rowCount = (matrix).length;
  const rowLength = curRow.length;
  // at the last cell
  if (rowIndex === rowCount-1 && columnIndex === rowLength-1) {
    return [curCell];
  } else if (!curCell) {
    // current cell is not passable
    return []
  }

  // keep searching
  // right then bottom
  const leftResult = search(matrix, rowIndex, columnIndex + 1);
  if (leftResult.length) {
    return [curCell, ...leftResult];
  } 

  const bottomResult = search(matrix, rowIndex + 1, columnIndex);
  if (bottomResult.length) {
    return [curCell, ...bottomResult];
  } 

  return [];
}

function findPath(matrix = []) {
  const rowIndex = 0;
  const columnIndex = 0;
  matrix = (matrix && matrix.length) ? matrix : [[]];
  return search(matrix, rowIndex, columnIndex);
}

/**
 * using dynamic programming:
 * go from last row and up, and keeping rolling paths upward
 * 
 * time and space:
 * time: still N * M width * height
 * space: as you are rolling rows upward: you will have N cell per row
 * and each cell can contain a N + M size array (a path)
 */

function searchDP(matrix) {

}

function findPathDP(matrix = []) {
  matrix = (matrix && matrix.length) ? matrix : [[]];

  const lastRow = matrix[matrix.length - 1];
  let cacheRow = Array(lastRow.length);
  
  const finalRow = matrix.reduceRight((DPRow, curRow, rowIndex) => {
    curRow = curRow.slice();
    for (let cellIndex = curRow.length - 1; cellIndex > -1; cellIndex--) {
      const curCell = curRow[cellIndex];
      if (!curCell) {
        curRow[cellIndex] = [];
      } else if (rowIndex === matrix.length - 1 && cellIndex === curRow.length - 1) {
        curRow[cellIndex] = [curCell];
      } else {
        const rightResult = curRow[cellIndex + 1] || [];
        if (rightResult.length) {
          curRow[cellIndex] = [curCell, ...rightResult];
        } else {
          const bottomResult = DPRow[cellIndex] || [];
          curRow[cellIndex] = bottomResult.length ? [curCell, ...bottomResult] : [];
        }
      }
    }

    return curRow;
  }, cacheRow);

  return finalRow[0] || [];
}

// set > 0 to passable,  = 0 to not passable
describe('robot in a grid', () => {
  it('should return [] for empty matrix', () => {
    const matrix = null;
    expect(findPath(matrix)).to.eql([]);
  });
  it('should return [] for empty matrix', () => {
    const matrix = [];
    expect(findPath(matrix)).to.eql([]);
  });
  it('should return [] for empty matrix', () => {
    const matrix = [[]];
    expect(findPath(matrix)).to.eql([]);
  });
  it('should return a correct result for matrix', () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 0, 7, 8],
      [9, 0,11,12],
      [13,0,15,16],
    ];
    expect(findPath(matrix)).to.eql([1,2,3,4,8,12,16]);
  });
  it('should return [] for impossable matrix', () => {
    const matrix = [
      [1, 0, 3, 4],
      [5, 0, 7, 8],
      [9, 0,11,12],
      [13,0,15,16],
    ];
    expect(findPath(matrix)).to.eql([]);
  });
});

describe('robot in a grid with DP', () => {
  it('should return [] for empty matrix', () => {
    const matrix = null;
    expect(findPathDP(matrix)).to.eql([]);
  });
  it('should return [] for empty matrix', () => {
    const matrix = [];
    expect(findPathDP(matrix)).to.eql([]);
  });
  it('should return [] for empty matrix', () => {
    const matrix = [[]];
    expect(findPathDP(matrix)).to.eql([]);
  });
  it('should return a correct result for matrix', () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 0, 7, 8],
      [9, 0,11,12],
      [13,0,15,16],
    ];
    expect(findPathDP(matrix)).to.eql([1,2,3,4,8,12,16]);
  });
  it('should return [] for impossable matrix', () => {
    const matrix = [
      [1, 0, 3, 4],
      [5, 0, 7, 8],
      [9, 0,11,12],
      [13,0,15,16],
    ];
    expect(findPathDP(matrix)).to.eql([]);
  });
});