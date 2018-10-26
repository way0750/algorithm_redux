// Given a matrix, write a function to determine whether the matrix is a Toeplitz matrix. A Toeplitz matrix  is a matrix in which each descending diagonal from left to right is constant.
// Follow-up question: Assume that the entire matrix cannot fit into memory and should be read from file. Assume that a few rows and all columns can be read in. How could we verify?
// Wikipedia: https://en.wikipedia.org/wiki/Toeplitz_matrix
// image: https://wikimedia.org/api/rest_v1/media/math/render/svg/ffb0725a08b85d5c447cbec3907e39b818d55941

/**
 * solution 1:
 * as you go through each row, just keep checking the current cell vaue against the one above and to the left
 * as soon as a inconsistent value found, return false;
 * 
 * solution 2:
 * maintain a row which is a copy of the very first row
 * then each time when you get access to the next row, you pop the last one since it's no longer needed
 * and push another number (the first one from the new row), to the front
 * then again, check new row's each index vaue against same index from the state maintaning row
 *   whenever found inconsistance return false;
 * 
 * solution 2 will be able to handle the follow-up question becaues it doesn't need to know the entire size of the matrix, and it
 * maintains the most current state in which we can use to check if there are inconsistances
 */

// solution 2, without dealing with the follow up:
// time complexity: n * m
// space: m (the width of matrix)
export function isToeplitzMatrix(matrix, previousRow?: Array<any>) {
  return matrix.every((row) => {
    if (!previousRow) {
      previousRow = row.slice();
    } else {
      // the very last number is not needed for current row comparation
      previousRow.pop();
      // push the current row's first item in it, as a placeholder item to pass the comparation
      // but it will be useful for subsequent rows' comparations
      previousRow.unshift(row[0]);
    }
    return row.every((cell, index) => cell === previousRow[index]);
  });
}

// a reimplementation that maintain state for handling the follow up case above 
function makeIsToeplitzMatrixFunc() {
  let previousRows;
  let isCurrentlyToeplitz = true;
  return function isToeplitzMatrixPartially(partialMatrix) {
    // passing previousRows into isToeplitzMatrix, this way it will be mutated and maintain the most recent
    // row for next comparisions.
    if (!isCurrentlyToeplitz) {
      return false;
    }
    if (!previousRows) {
      // set up the previous row before the first time calling isToeplitzMatrix
      previousRows = partialMatrix[0].slice();
      previousRows.shift(); 
      previousRows.push(Infinity); //a placeholder value that will get popped
    }
    isCurrentlyToeplitz = isToeplitzMatrix(partialMatrix, previousRows);
    return isCurrentlyToeplitz;
  };
}

describe('isToeplitzMatrix', () => {
  it('should return true', () => {
    const matrix = [
      [1,2,3,4,5],
      [6,1,2,3,4],
      [7,6,1,2,3],
      [8,7,6,1,2],
      [9,8,7,6,1],
    ];
    expect(isToeplitzMatrix(matrix)).to.be.true;
  });

  it('should return false', () => {
    const matrix = [
      [1,2,3,4,5],
      [6,1,2,3,4],
      [7,6,1,2,3],
      [8,7,6,1,2],
      [9,18,7,6,1],
    ];
    expect(isToeplitzMatrix(matrix)).to.be.false;
  });
});

describe('isToeplitzMatrix handling follow up case', () => {
  it('should return true', () => {
    const fileRows = [
      [1,2,3,4,5],
      [6,1,2,3,4],
      [7,6,1,2,3],
      [8,7,6,1,2],
      [9,8,7,6,1],
    ];
    const func = makeIsToeplitzMatrixFunc();
    const results = fileRows.map((row) => {
      return func([row]);
    });
    // mimic printing things out
    expect(results).to.deep.equal([true, true, true, true, true]);
  });

  it('should return false', () => {
    const fileRows = [
      [1,2,3,4,5],
      [6,1,2,3,4],
      [7,6,11,2,3], // notice the 11?
      [8,7,6,1,2],
      [9,8,7,6,1],
    ];

    const func = makeIsToeplitzMatrixFunc();
    const results = fileRows.map((row) => {
      return func([row]);
    });
    expect(results).to.deep.equal([true, true, false, false, false]);
  });
});