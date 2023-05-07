/**
 * Zero Matrix: Write an algorithm such that if an element in an MxN matrix is 0,
 * its entire row and column are set to O
 * time and space:
 * time: O(n*m), space: O(n*m);
 */

export function zeroMatrix(matrix) {
    const topRecord = [...matrix[0]];
    const leftRecord = matrix.map((row) => row[0]);
    matrix.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            topRecord[colIndex] = Math.min(cell, topRecord[colIndex]);
            leftRecord[rowIndex] = Math.min(cell, leftRecord[rowIndex]);
        });
    });

    const newMatrix = [];
    for (let rowIndex = 0; rowIndex < leftRecord.length; rowIndex++) {
        let newRow = Array(topRecord.length).fill(1);
        newRow = newRow.map((_, colIndex) => {
            return Math.min(topRecord[colIndex], leftRecord[rowIndex]);
        });
        newMatrix.push(newRow);
    }

    return newMatrix;
}

describe('zero matrix', () => {
    it('should have 1 cell with 1', () => {
        const matrix = [
            [0,1,0],
            [1,1,1],
            [0,1,0],
        ];
        expect(zeroMatrix(matrix).toString()).to.equal([
            [0,0,0],
            [0,1,0],
            [0,0,0],
        ].toString());
    });
    it('should have 1 cell with 1', () => {
        const matrix = [
            [0,1,0,0],
            [1,1,1,1],
            [0,1,0,0],
        ];
        expect(zeroMatrix(matrix).toString()).to.equal([
            [0,0,0,0],
            [0,1,0,0],
            [0,0,0,0],
        ].toString());
    });
});