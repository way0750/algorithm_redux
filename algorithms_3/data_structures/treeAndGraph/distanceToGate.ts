/**
 * Problem Statement:

Suppose you have a m x n 2D grid initialized with these three possible values.

    -1: A wall or an obstacle.
    0: A gate.
    INF: Represented by Integer.MAX_VALUE in Java, for an empty room. We use the
    value 2^31 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is
    less than 2147483647.

Fill each empty room with the distance to its nearest gate. If it is impossible to reach a
gate, it should be filled with INF.

Example:

Given the 2D grid:

INF  -1  0  INF
INF INF INF  -1
INF  -1 INF  -1
  0  -1 INF INF

After running your function, the 2D grid should be:

  3  -1   0   1
  2   2   1  -1
  1  -1   2  -1
  0  -1   3   4

This problem is a bit more challenging as it involves understanding the representation
of a graph in 2D grid form and using a breadth-first search (BFS) to fill in distances.
Consider using a queue to keep track of all the gates, and in each round, "expand" from
the gates to their neighboring rooms until there's no room to expand.

Also, consider the time and space complexity of your solution.


do a breadth first search from each gate (0), each breadth/level will increase and that is the distance
to the gate.
when comes to expand the breadth, don't take any value unless it is larger than the breadth
so no -1, 0, distance that's smaller
 */

function getCells (matrix, rowIndex, colIndex, distance) {
    let cellsToVisit = [
        [rowIndex - 1, colIndex],
        [rowIndex + 1, colIndex],
        [rowIndex, colIndex - 1],
        [rowIndex, colIndex + 1],
    ];
    cellsToVisit = cellsToVisit.filter(([x, y]) => {
        const isXInBound = x > -1 && x < matrix.length
        const isYInBound = y > -1 && y < matrix[0].length
        return isXInBound && isYInBound && matrix[x][y] > distance;
    });

    return cellsToVisit;
}

export function distanceToGate (grid) {
    const matrix = grid.map((row) => row.map((val) => val));
    matrix.forEach((row, rowIndex) => {
        row.forEach((val, colIndex) => {
            if (val === 0) {
                let curDistance = 1;
                let cellsToVisit = getCells(matrix, rowIndex, colIndex, curDistance);
                while (cellsToVisit.length) {
                    const nextCells = [];
                    cellsToVisit.forEach(([x, y]) => {
                        if (matrix[x][y] > curDistance) {
                            matrix[x][y] = curDistance;
                            const newCells = getCells(matrix, x, y, curDistance + 1);
                            nextCells.push(...newCells);
                        }
                    });
                    curDistance++;
                    cellsToVisit = nextCells;
                }
            }
        });
    });

    return matrix;
} 

describe('distance to gate', () => {
    it('should return correct matrix', () => {
        const INF = 99999999;
        const matrix = [
            [INF, -1, 0, INF],
            [INF, INF, INF , -1],
            [INF ,-1, INF , -1],
            [0 ,-1, INF, INF],
        ];
        expect(distanceToGate(matrix)).to.equal([]);
    });
});