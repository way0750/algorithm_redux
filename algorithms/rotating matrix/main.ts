/**
 * Given a n by n matrix, rotate it by 90 / 180 / 270 deg
 * 
 * ex: 
 * [1,  2,  3,  4]
 * [5,  6,  7,  8]
 * [9,  10, 11, 12]
 * [13, 14, 15, 16]
 * 
 * turn it 90 deg:
 * [13, 9,  5, 1]
 * [14, 10, 6, 2]
 * [15, 11, 7, 3]
 * [16, 12, 8, 4]
 * 
 * 
 * solution: flip the rows in the matrix: first row becomes the last row, last row becomes the first
 * then downward diagonally swap number alone the middle line, ex matrix[x][y] swap with matrix[y][x]
 * 
 * time and space complexity
 * each helper function will clone the matrix, so that's n*2 already
 * then iterate row by row downward, so that n
 * then if diagonally flip the matrix, then that's about 1/2 of n 
 * if flip left to right, that's another n*2
 * 
 * worst case is when rotating 180: flip up down then left right
 * n*2 + n + n*2
 * 2(n*2) + n
 * drop the least significant number and constant
 * you get n*2 for time
 * 
 * for space, cloning the matrix will be n*2
 * then flipping diagonally in place will use no additional space
 * but when flipping left to right, that's another n*2
 * so worst case flipiing up down then left right
 * you get 2(n*2) which is n*2
 */


function flipVertically(matrix) {
  const matrixClone = matrix.map((row) => row.slice());
  return matrixClone.reverse();
}

function flipDownwardDiagonally(matrix) {
  const matrixClone = matrix.map((row) => row.slice());
  // clone the matrix, should keep the function pure
  for (let rowIndex = 0; rowIndex < matrixClone.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < matrixClone.length; cellIndex++) {
      if (cellIndex > rowIndex) {
        const curFocusedCell = matrixClone[rowIndex][cellIndex];
        matrixClone[rowIndex][cellIndex] = matrixClone[cellIndex][rowIndex];
        matrixClone[cellIndex][rowIndex] = curFocusedCell;
      }
    }
  }
  return matrixClone;
}

function flipHorizontally(matrix) {
  const matrixClone = matrix.map((row) => row.slice());
  return matrixClone.map((row) => row.reverse());
}

function flipUpwardDiagonally(matrix: Array<Array<number>>) {
  const matrixClone = matrix.map((row) => row.slice());
  const matrixLength = matrixClone.length;
  for (let rowIndex = 0; rowIndex < matrixLength; rowIndex++) {
    for (let cellIndex = 0; cellIndex < matrixLength; cellIndex++) {
      let lastCellIndexToVisit = matrixLength - 1 - rowIndex;
      if (cellIndex < lastCellIndexToVisit) {
        const curFocusedCell = matrixClone[rowIndex][cellIndex];
        const targetCellIndex = matrixLength - 1 - rowIndex;
        const targetRowIndex = matrixLength - 1 - cellIndex;
        matrixClone[rowIndex][cellIndex] = matrixClone[targetRowIndex][targetCellIndex];
        matrixClone[targetRowIndex][targetCellIndex] = curFocusedCell;
      }
    }
  }
  return matrixClone;
}

/**
 * give a matrix and a degree to rotate the matrix
 * what if the number is negative? what if the number isn't some like 90, 180, 270
 * what if the number is larger than 360
 * 
 * so normalize the deg to one of these four integers 0/90/180/270 first
 * num % 1 == 0?
 * num % 360 to get a number between -360 and 360
 * then 360 + that number, you will get 0/90/180/270
 */

function getClockWiseRotationDegree(num) {
  // get a number between -360 and 360;
  const scaledDownNum = num % 360
  // scaledDownNum might be a negative number, turn it into it's positive counter part
  const clockWiseDegree = (360 + scaledDownNum) % 360;
  return clockWiseDegree;
}

function rotateMatrix(matrix, rotateDegree) {
  const clockWiseRotation = getClockWiseRotationDegree(rotateDegree);
  // we can only rotate matrix by 90 degrees
  if (!Number.isInteger(clockWiseRotation) || !clockWiseRotation) {
    return matrix;
  }

  if (clockWiseRotation === 90) {
    // flip up down then downward diagonally
    const flippedVerticallyMatrix = flipVertically(matrix);
    const flipDownwardDiagonallyMatrix = flipDownwardDiagonally(flippedVerticallyMatrix);
    return flipDownwardDiagonallyMatrix;
  } else if (clockWiseRotation === 180) {
    // flip up down then left right
    const flippedVerticallyMatrix = flipVertically(matrix);
    const flipHorizontallyMatrix = flipHorizontally(flippedVerticallyMatrix);
    return flipHorizontallyMatrix;
  } else if (clockWiseRotation === 270) {
    // flip up down then upward diagonally
    const flippedVerticallyMatrix = flipVertically(matrix);
    const flipUpwardDiagonallyMatrix = flipUpwardDiagonally(flippedVerticallyMatrix);
    return flipUpwardDiagonallyMatrix;
  } else {
    return matrix.map((row) => row.slice());
  }
}

const testMatrix1 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
];

rotateMatrix(testMatrix1, 360);