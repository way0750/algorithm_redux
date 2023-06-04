/**
    Problem: Longest Increasing Path in a Matrix
    Given an m x n matrix of integers, return the length of the longest increasing path, where "increasing" means that each step in the path must go to a neighboring cell (you can move either horizontally or vertically, but not diagonally) and that cell's value must be strictly greater than the previous cell's value.

    Example:

    javascript

    Input: [
        [9, 9, 4],
        [6, 6, 8],
        [2, 1, 1]
    ]
    Output: 4

    Explanation: The longest increasing path is [1, 2, 6, 9].

    Constraints:

        You can only move to four directions: up, down, left, right.
        You cannot move diagonally or move outside of the boundary (i.e., wrap-around is not allowed).
        0 <= matrix.length, matrix[0].length <= 200
        0 <= matrix[i][j] <= 2^31 - 1

        basically a graph travasal problem where you accumulate all the longest paths
        then reuse them later

        use recursion
        recursive case:
            there will be 4 nodes surrounding the current node
            only recursively call any of them that are larger than current node by value
        what to always return
            an integer: how many nodes with increasing value you can visit
        what to do with return
            you might end up with 4 integers from each of the 4 neibouring nodes
                take the largest one, and add 1 (for current node) to it
                then return this larger number
        
        make sure to mark a node as visited
 */

export function longestPath(matrix) {
    const visitRec = Array(matrix.length)
        .fill(0)
        .map(() => Array(matrix[0].length).fill(false));
    const rowSize = matrix.length;
    const colSize = matrix[0].length;
    function search(pos) {
        // mark the current node as visited to avoid infinit loop
        const [x, y] = pos;
        visitRec[x][y] = true;
        const nodeVal = matrix[x][y];
        let adjNodes = [[x-1, y], [x+1, y], [x, y-1], [x, y+1]];
        adjNodes = adjNodes.filter(([x, y]) => {
            if (x < 0 || x > rowSize-1 || y < 0 || y > colSize-1) {
                return false;
            } else {
                return !visitRec[x][y] && matrix[x][y] > nodeVal;
            }
        });

        const subPathCount = adjNodes.map((pos) => search(pos) + 1);
        // adding 1 for cur node in case of no valid neibour nodes to visit
        return Math.max(...subPathCount, 1);
    }

    let curMaxPathCount = 0;
    visitRec.forEach((row, rowIndex) => {
        row.forEach((visited, colIndex) => {
            if (!visited) {
                curMaxPathCount = Math.max(
                    curMaxPathCount,
                    search([rowIndex, colIndex]),
                );
            }
        })
    })
    return curMaxPathCount;
}

describe('longest increasing path', () => {
    it('should find the longest', () => {
        const matrix = [
            [9, 9, 4],
            [6, 6, 8],
            [2, 1, 1]
        ];
        expect(longestPath(matrix)).to.equal(4);
    });
    it('should find the longest 002', () => {
        const matrix = [
            [8,8,8,8],
            [4,3,2,8],
            [5,8,1,8],
            [6,7,8,8],
        ];
        expect(longestPath(matrix)).to.equal(8);
    });
});