// You are given a 2-d matrix where each cell represents number of coins in that cell.
// Assuming we start at matrix[0][0], and can only move right or down, find the maximum number of coins you
// can collect by the bottom right corner.
// For example, in this matrix
// 0 3 1 1
// 2 0 0 4
// 1 5 3 1
// The most we can collect is 0 + 2 + 1 + 5 + 3 + 1 = 12 coins.

/**
 * solution 1: use dynamic programming
 * loop from the very last cell, to its far left, then same for the upper row one by one.
 * In that case you are pretty much creating all possible sub case/problem all. And each sub case/problem
 * can reuse result from its immedite right cell and immedite bottom cell. 
 * at the very end, just return the value at matrix[0][0]
 * 
 * time: n * m, this solution is shape independent, square or rectangle, both works
 * space: n * m too, but with some optimizatin, you can reduce it to m because only the immedite row below the current
 * row is needed for precalculate results
 */

// This solution will mutate the input
function forEachBackward (array, callback) {
  for (let index = array.length - 1; index > -1; index-- ) {
    callback(array[index], index, array);
  }
}

export function getMaxCoinValue(matrix: Array<Array<number>>): number {
  forEachBackward(matrix, (row: Array<number>, rowIndex: number) => {
    forEachBackward(row, (cell: number, cellIndex: number) => {
      const adjacentRightIndex = cellIndex + 1;
      const mostCoinValueFromRight =  adjacentRightIndex < row.length ? row[adjacentRightIndex] : 0;

      const bottomRowIndex = rowIndex + 1;
      const bottomRow = matrix[bottomRowIndex] || [];
      const mostCoinValueFromBottom = bottomRow[cellIndex] || 0;

      const curValue = cell
      const mostCoinValueFromCurIndex  = curValue + Math.max(mostCoinValueFromRight, mostCoinValueFromBottom);
      matrix[rowIndex][cellIndex] = mostCoinValueFromCurIndex;
    });
  });
  const firstRow = matrix[0] || [];
  return firstRow[0] || 0;
}


// This one doesn't mutate the input:
function getMaxCoinValueNoInputMutation(matrix): number {
  let matrixReverseClone = matrix.map((row: Array<number>) => row.reverse());
  matrixReverseClone = matrixReverseClone.reverse();
  matrixReverseClone.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const adjacentLeftIndex = cellIndex - 1;
      const mostCoinValueFromLeft =  adjacentLeftIndex > -1 ? row[adjacentLeftIndex] : 0;

      const topRowIndex = rowIndex - 1;
      const bottomRow = matrixReverseClone[topRowIndex] || [];
      const mostCoinValueFromTop = bottomRow[cellIndex] || 0;

      const curValue = cell
      const mostCoinValueFromCurIndex  = curValue + Math.max(mostCoinValueFromLeft, mostCoinValueFromTop);
      matrixReverseClone[rowIndex][cellIndex] = mostCoinValueFromCurIndex;
    });
  });

  const lastRow = matrixReverseClone[matrixReverseClone.length - 1] || [];
  return lastRow[lastRow.length - 1] || 0;
}

describe('Most coin value', () => {
  it('should return result for example above', () => {
    const matrix = [
      [0, 3, 1, 1],
      [2, 0, 0, 4],
      [1, 5, 3, 1],
    ];
    expect(getMaxCoinValue(matrix)).to.equal(12);
  });

  it('should return zero for empty array', () => {
    const matrix = [];
    expect(getMaxCoinValue(matrix)).to.equal(0);
  });

  it('should return 9', () => {
    const matrix = [
      [0, 3, 1, 1],
      [2, 0, 0, 4]
    ];
    expect(getMaxCoinValue(matrix)).to.equal(9);
  });
});

describe('Most coin value: no mutating input version', () => {
  it('should return result for example above', () => {
    const matrix = [
      [0, 3, 1, 1],
      [2, 0, 0, 4],
      [1, 5, 3, 1],
    ];
    expect(getMaxCoinValueNoInputMutation(matrix)).to.equal(12);
  });

  it('should return zero for empty array', () => {
    const matrix = [];
    expect(getMaxCoinValueNoInputMutation(matrix)).to.equal(0);
  });

  it('should return 9', () => {
    const matrix = [
      [0, 3, 1, 1],
      [2, 0, 0, 4]
    ];
    expect(getMaxCoinValueNoInputMutation(matrix)).to.equal(9);
  });
});