/**
 * just do a depth first search and keep on passing the shortern word to the next call
 * 
 * base case:
 *      if input str is '' then return true
 *      any time when the first char of input str is different than the
 *          char at the current pos in the matrix, return false
 * how to break problem smaller:
 *      str.slice(1), keep on passing a shorterned str to the next call
 * what to do with return?
 *      if it's true, just keep on returning true,
 *      if it's false, then check another char
 * what to always return:
 *      boolean
 */

export function isWordInMatrix(matrix, str) {
    const isVisited = Array(matrix.length).fill(0)
        .map(() => Array(matrix[0].length).fill(false));

    function search ([x, y], str) {
        if (!str) return true;
        if (matrix[x][y] !== str[0]) return false;
        isVisited[x][y] = true;
        // get next pos;
        const newPoses = [ [x+1, y], [x-1, y], [x, y+1], [x, y-1] ]
            .filter(([x, y]) => {
                const isValidX = x >= 0 && x < matrix.length;
                const isValidY = y >= 0 && y < matrix[0].length;
                if (!isValidX || !isValidY || isVisited[x][y]) return false;
                return true;
            });
        const foundPath = newPoses.some(([x, y]) => search([x, y], str.slice(1)));
        isVisited[x][y] = false;
        return foundPath;
    }

    return matrix.some((row, x) => {
        return row.some((_, y) => {
            return search([x, y], str);
        });
    });
}

describe('', () => {
    it('', () => {
        const matrix = [
            ['A','B','C','E'],
            ['S','F','C','S'],
            ['A','D','E','E']
        ];
        const str =  'ABCCED';
        expect(isWordInMatrix(matrix, str)).to.equal(true);
    });
});