export function countIslands(matrix) {
    let islandCount = 0;
    matrix.forEach((row, x) => {
        row.forEach((val, y) => {
            if (val === 1) {
                islandCount++;
                let queue = [[x, y]];
                matrix[x][y] = 2;
                while (queue.length) {
                    const newQueue = [];
                    queue.forEach(([x, y]) => {
                        let adjCells = [
                            [x-1, y],
                            [x+1, y],
                            [x, y-1],
                            [x, y+1],
                        ];
                        adjCells = adjCells.filter(([x, y]) => {
                            const isXInBound = x > -1 && x < matrix.length;
                            const isYInBound = y > -1 && y < matrix[0].length;
                            if (isXInBound && isYInBound && matrix[x][y] === 1) {
                                matrix[x][y] = 2;
                                return true;
                            }
                            return false;
                        });
                        newQueue.push(...adjCells);
                    });
                    queue = newQueue;
                }
            }
        });
    });
    return islandCount;
}

describe('should find the island count', () => {
    it('should return the right count', () => {
        let grid = [
            [1,1,0,0,0],
            [1,1,0,0,0],
            [0,0,1,0,0],
            [0,0,0,1,1]
        ];
        expect(countIslands(grid)).to.equal(3);
    });
});