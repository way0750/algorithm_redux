/**
 * Give a list of points in a 2-d matrix, find the line with the most amount of points, if there
 * are multiple, return all of thme.
 * a line can go vertical, horizontal, diagonal up or down
 * ex: [[0, 1], [2,2], [3,3], [0, 2], [0, 3], [0,4]]
 * return [
 *   [[0, 1], [0, 2], [0, 3], [0, 4]] // one line
 * ];
 * 
 * solution:
 * each line can be part of 4 lines: horizontal, vertical, diagonal up and down
 * coerce each point's position to the lines that it belong.
 * ex for point [x:2, y:3] it belongs in these line that go through these positions:
 * horizontal: [x: 0, y: 3] get this by moving x to 0
 * vertical: [x:2, y:0], get this by moving y to 0
 * diagonal down: [x:0, y:1], get this by moving back x y by smallest number of x and y 
 * diagonal up: [x:, y: ], get this by first finding out how many steps x would need to hit the left border: xStepToLeftBorder = MatrixLength - x,
 *   and how many steps y would need to hit the top border, which is itself: yStepToUpperBorder = y.
 *   commonSteps = smaller of xStepToLeftBorder vs yStepToUpperBorder
 *   get the new position as the line position:  x + commonSteps, y - commonSteps
 * 
 * do these 4 steps for all the points then you will end up with many lines get longest ones
 * 
 * time and space complexity:
 * time: loop through n points once to make those lines, worst case you will ended up with n lines
 * loop through them to get the longest ones, so that's another n
 * 2n which is n. that's linear
 * 
 * space: worst case four lines per points so 4n lines
 * then longest lines, worst case all the lines are the same length, then you get 4n longest lines
 * so 8n, which is n, that's linear.
 */

function lineWithMostPoints(points: Array<Array<number>>) {
  const lines = {};
  points.forEach((point: Array<number>) => {
    const [x, y] = point;

    const horizontalLineKey = `0,${y}`;
    lines[horizontalLineKey] = lines[horizontalLineKey] || [];
    lines[horizontalLineKey].push(point);

    const verticalLineKey = `${x},0`;
    lines[verticalLineKey] = lines[verticalLineKey] || [];
    lines[verticalLineKey].push(point);

    const xStepToLeftBorder = points.length - x;
    const yStepToUpperBorder = y;
    const stepToDiagonalUp = Math.min(xStepToLeftBorder, yStepToUpperBorder);
    const diagonalUpKey = `${x + stepToDiagonalUp}, ${y - stepToDiagonalUp}`;
    lines[diagonalUpKey] = lines[diagonalUpKey] || [];
    lines[diagonalUpKey].push(point);

    const stepToDiagonalDown = Math.min(x, y);
    const diagonalDownKey = `${x - stepToDiagonalDown},${y - stepToDiagonalDown}`;
    lines[diagonalDownKey] = lines[diagonalDownKey] || [];
    lines[diagonalDownKey].push(point);
  });

  let currentLinesPointCount = 0;
  let longestLines = [];
  const allLineKeys: Array<string> = Object.keys(lines);
  allLineKeys.forEach((lineKey: string) => {
    const line = lines[lineKey];
    if (line.length === currentLinesPointCount) {
      longestLines.push(line);
    } else if (line.length > currentLinesPointCount) {
      currentLinesPointCount = line.length;
      longestLines = [line];
    }
  });

  return longestLines;
}

describe('line with most points', () => {
  it('should return empty array if input is empty array', () => {
    const points = [];
    const result = lineWithMostPoints(points);
    expect(result).to.deep.equal([]);
  });

  it('should return 4 lines if one point because 1 point has 4 lines and all the same length', () => {
    const points = [[4, 4]];
    const collectionOfOneLine = lineWithMostPoints(points);
    const expectedResult = [
      [[4, 4,]],
      [[4, 4,]],
      [[4, 4,]],
      [[4, 4,]],
    ];
    expect(collectionOfOneLine).to.deep.equal(expectedResult)
  });
});