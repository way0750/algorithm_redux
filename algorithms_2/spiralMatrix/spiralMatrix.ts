/**
 * Matrix Spiral Copy
 * Given a 2D array (matrix) inputMatrix of integers, create a function
 * spiralCopy that copies inputMatrix’s values into a 1D array in a spiral
 * order, clockwise. Your function then should return that array. Analyze the
 * time and space complexities of your solution.

 input:  inputMatrix  = [ [1,    2,   3,  4,    5],
                         [6,    7,   8,  9,   10],
                         [11,  12,  13,  14,  15],
                         [16,  17,  18,  19,  20] ]

output: [1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6, 7, 8, 9, 14, 13, 12]

set top, right, bottom, and left bound
just while loop as long as top <= bottom && left <= right
each loop
top left to right
for loop from leftBound to < rightBound
top right to bottom
for loop from topBound to < bottomBound
bottom right to left
for loop from rightBound to < leftBound
bottom left to top
for loop from bottomBound to < topBound

then top++, bottom--, left++, right--

time and space:
time: going through each cell, meaning n*m
space: return the same size array, so n*m
 */

export function spiralMatrix(matrix) {
  const array = [];
  if (!matrix.length) {
    return array;
  };
  let topBound = 0;
  let rightBound = matrix[0].length-1;
  let bottomBound = matrix.length-1;
  let leftBound = 0;

  while(topBound <= bottomBound && leftBound <= rightBound) {
    // loop the top layer left to right;
    for (let col = leftBound; col <= rightBound; col++) {
      array.push(matrix[topBound][col]);
    }
    topBound++;

    // loop right layer top to bottom:
    for (let row = topBound; row <= bottomBound; row++) {
      array.push(matrix[row][rightBound]);
    }
    rightBound--;

    // loop bottom layer right to left:
    for (let col = rightBound; col >= leftBound && topBound <= bottomBound; col--) {
      array.push(matrix[bottomBound][col]);
    }
    bottomBound--;

    // loop left layer bottom to top:
    for (let row = bottomBound; row >= topBound && leftBound <= rightBound; row--) {
      array.push(matrix[row][leftBound]);
    }
    leftBound++
  }

  return array;
}
