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