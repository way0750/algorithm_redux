/**
 * rote matrix in place
 * 
 * solution 1:
 * swap in place to flip the matrix up down
 * then swap in place flip the matrix downward diagonal
 */

function flipUpDown(matrix) {
  for(let i = 0; i < (Math.floor(matrix.length/2)); i++) {
    const curRow = matrix[i];
    const swapRow = matrix[matrix.length - i - 1];
    swapRow.forEach((swapNum, index) => {
      swapRow[index] = curRow[index];
      curRow[index] = swapNum;
    });
  }
  return matrix;
}

function flipDownwardDiaganal(matrix) {
  for (let curRowIndex = 0; curRowIndex < matrix.length; curRowIndex++) {
    const curRow = matrix[curRowIndex];
    curRow.forEach((curRowNum, curColIndex) => {
      // this ensures downward diagonal swap:
      if(curColIndex > curRowIndex) {
        matrix[curRowIndex][curColIndex] = matrix[curColIndex][curRowIndex];
        matrix[curColIndex][curRowIndex] = curRowNum;
      }
    });
  }
  return matrix;
}

export function roateMatrix(matrix) {
  matrix = flipUpDown(matrix);
  matrix = flipDownwardDiaganal(matrix);
  return matrix;
}

describe('rotate matrix', () => {
  it('should return correct 001', () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10,11,12],
      [13,14,15,16]
    ];
    const expected = [
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3],
      [16, 12, 8, 4]
    ];

    expect(roateMatrix(matrix)).to.deep.equal(expected);
  });
  it('should return correct 002', () => {
    const matrix = [
      [1, 2, 3],
      [5, 6, 7],
      [9, 10,11],
    ];
    const expected = [
      [9, 5, 1],
      [10, 6, 2],
      [11, 7, 3]
    ];

    expect(roateMatrix(matrix)).to.deep.equal(expected);
  });
});