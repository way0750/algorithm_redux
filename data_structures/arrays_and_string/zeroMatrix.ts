/**
 * Write an algorithm such that if an element in an MxN matrix is 0, its entire row and
 * column are set to O.
 * 
 * solution 1, not in place:
 * set zeroColRecord to the copy of first array;
 * set allZero to same length array as the first row, but with everything set to
 * 0
 * loop through each array
 * check each index for 0, if found, then update same index in zeroColRecord to
 * be 0.
 * if any 0 is found then make matrix refer to allZero for this row index
 * 
 * solution 2 in place:
 * first find all the zero column
 * and each row, if found 0, then change first element to 0
 * 
 * then second loop, check and see if first element is 0
 * if yes: 0 out every element
 * if no: then use the record
 * 
 * time and space:
 * time: you will go through each element twice so 2N**2 which is n**2
 * space: you will keep one row which M length, so M
 */

export function zeroMatrixInPlace(matrix) {
  if (matrix.length === 0 ) {
    return matrix;
  }
  const zeroColRecord = [...(matrix[0] || [])];
  matrix.forEach((row) => {
    let foundZero = false;
    row.forEach((num, numIndex) => {
      if (num === 0) {
        zeroColRecord[numIndex] = 0;
        foundZero = true;
      }
    })

    if (foundZero) {
      row[0] = 0;
    }
  });

  matrix.forEach((row) => {
    if(row[0] === 0) {
      row.forEach((num, numIndex) => row[numIndex] = 0);
    } else {
      row.forEach((num, numIndex) => row[numIndex] = zeroColRecord[numIndex]);
    }
  });

  return matrix;
}

describe('zero matrix', () => {
  it('test 001', () => {
    const matrix = [
      [1,0,0,1,1],
      [1,1,1,1,1],
      [1,1,1,1,1],
      [1,1,1,0,1]
    ];

    const expectedMatrix = [
      [0,0,0,0,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,0,0,0,0]
    ];

    expect(zeroMatrixInPlace(matrix)).to.deep.equal(expectedMatrix);
  });
  it('test empty matrix', () => {
    const matrix = [];

    const expectedMatrix = [];

    expect(zeroMatrixInPlace(matrix)).to.deep.equal(expectedMatrix);
  });

  it('test 003', () => {
    const matrix = [
      [1,0,1,1,1],
      [1,1,1,1,1],
      [1,1,1,1,1],
      [1,1,1,0,1]
    ];

    const expectedMatrix = [
      [0,0,0,0,0],
      [1,0,1,0,1],
      [1,0,1,0,1],
      [0,0,0,0,0]
    ];

    expect(zeroMatrixInPlace(matrix)).to.deep.equal(expectedMatrix);
  });
});