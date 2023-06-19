/**
 * Problem

You are given a list of points in the plane. Write a function findClosestPair(points) that returns the distance between the two closest points.

You can assume that there will be at least two points in the array.

The distance between points (x1, y1) and (x2, y2) is calculated using the following formula:

sqrt((x1-x2)² + (y1-y2)²)

Input

The function receives a list of points. Each point is represented as an array of two numbers, where the first number represents the x-coordinate and the second number represents the y-coordinate.

Example:

js

findClosestPair([[1, 1], [2, 2], [3, 3], [4, 4]])

Output

The function should return a number, which is the distance between the two closest points.

Example:

js

1.4142135623730951

In this example, the two closest points are [1,1] and [2,2], and the distance between them is sqrt((1-2)² + (1-2)²) = sqrt(2) ~= 1.4142135623730951.

Note: In your solution, make sure to not use a naive O(n^2) solution, which checks all pairs of points. Try to find a more efficient algorithm.


    well basically this is a graph search problem:
    just do a multiple directional search with all the nodes
    and then just only look at the first two nodes that found each other first

    then do that fancy math.


    make graph
    multiple directional search
    do math
 */

function makeMatrix(points) { 
    const xLength = points.reduce((length, [x]) => Math.max(length, x), -Infinity);
    const yLength = points.reduce((length, [_, y]) => Math.max(length, y), -Infinity);
    const matrix = Array(xLength + 1).fill(0).map(() => {
        return Array(yLength + 1).fill(null);
    });

    points.forEach(([x, y], pointIndex) => matrix[x][y] = pointIndex);

    return matrix;
}

function getNextLevel([x, y], matrix) {
    const xLength = matrix.length;
    const yLength = matrix[0].length;
    let points = [
        [x-1, y], [x+1, y], [x, y-1], [x, y+1],
        [x-1, y-1], [x-1, y+1], [x+1, y-1], [x+1, y+1],
    ].filter(([x, y]) => {
        const validX = x >= 0 && x < xLength;
        const validY = y >= 0 && y < yLength;
        return validX && validY;
    });

    return points;
}

export function findClosestPair(points) {
    const matrix = makeMatrix(points);
    const posBubbles = points.map((pos) => [pos]);
    const maxDist = Math.max(matrix.length, matrix[0].length);
    for (let maxLoop = 0; maxLoop < maxDist; maxLoop++) {
        for (let pbi = 0; pbi < posBubbles.length; pbi++) {
            // going through one bubble at the time
            const expandedBubble = [];
            const curBubble = posBubbles[pbi];
            for (let cellI = 0; cellI < curBubble.length; cellI++) {
                // going through one pos at the same bubble at the time
                let newPoses = getNextLevel(curBubble[cellI], matrix);
                // need to: 1 make sure the new pos hasn't been visit by current point
                // 2: check and see if another point has alrady visited it
                for (let i = 0; i < newPoses.length; i++) {
                    const [x, y] = newPoses[i];
                    const cellVal = matrix[x][y];
                    if (cellVal !== null && cellVal !== pbi) {
                        const [x1, y1] = points[pbi];
                        const [x2, y2] = points[cellVal];
                        return Math.sqrt((x1-x2)**2 + (y1-y2)**2);
                    } else if (cellVal === null) {
                        expandedBubble.push(newPoses[i]);
                        matrix[x][y] = pbi;
                    }
                }
            }
            posBubbles[pbi] = expandedBubble;
        }
    }

    return -1;
}

describe('test', () => {
    it('should work', () => {
        // const points = [[1, 1], [2, 2], [3, 3], [4, 4]];
        const points = [[0, 0], [4, 4]];
        const returnVal = findClosestPair(points);
        expect(returnVal);
    });
});