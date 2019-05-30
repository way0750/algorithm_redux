/**
 * Implement the "paint nil" function that one might see on many image editing
 * programs. That is, given a screen (represented by a two-dimensional array of
 * colors), a point, and a new color, paint in the surrounding area until the
 * color changes from the original color.
 * 
 * so basically like the minesweeper program?
 * give a position, then do something to surrounding area?
 * 
 * solution 1:
 * save the target color
 * then from the given point, do a breadth search style search:
 * for each point you encounter, if you can paint it, then add the cells around
 * it to the next round
 * 
 * time and space:
 * time, for each point you will check surrounding 8 cells
 * worst case you have to pint all the cells (N), then it's about N * 8 which is
 * N
 * 
 * space, at the very end, worst case you will have outer most layer to paint
 * so it's gonna be width * height
 * if N is the amount of cells, and the shape of the image is a square then 
 * square root of N * 4 - 4
 */

export function painMatrix(matrix: Array<any> = [], position: Array<number> = [0,0], newColor: string) {
  if (!matrix.length || !matrix[0][0]) {
    return matrix
  }
  const targetColor = matrix[0][0];
  let points: Array<Array<number>> = [position];
  while(points.length) {
    points = points.reduce((nextRound: Array<Array<number>>, point) => {
      const curRow = point[0];
      const curCol = point[1];
      if (matrix[curRow][curCol] !== targetColor) {
        return nextRound;
      }

      matrix[curRow][curCol] = newColor;
      // now get the surrounding cells
      // first the top row 3
      // then the bottom row 3
      // then left and right
      const rowIndexes = [curRow-1, curRow, curRow+1];
      const colIndexes = [curCol-1, curCol, curCol+1];
      rowIndexes.forEach((rowIndex: number) => {
        if (matrix[rowIndex]) {
          colIndexes.forEach((colIndex: number) => {
            const cellColor = matrix[rowIndex][colIndex];
            if (cellColor && cellColor === targetColor) {
              nextRound.push([rowIndex, colIndex]);
            }
          });
        }
      });
      return nextRound;
    }, []);
  }
}