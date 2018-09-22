/**
 * Given a n by n matrix, rotate it by 90 / 180 / 270 deg
 * 
 * ex: 
 * [1,  2,  3,  4]
 * [5,  6,  7,  8]
 * [9,  10, 11, 12]
 * [13, 14, 15, 16]
 * 
 * turn it 90 deg:
 * [13, 9,  5, 1]
 * [14, 10, 6, 2]
 * [15, 11, 7, 3]
 * [16, 12, 8, 4]
 * 
 * 
 * solution: flip the rows in the matrix: first row becomes the last row, last row becomes the first
 * then downward diagonally swap number alone the middle line, ex matrix[x][y] swap with matrix[y][x]
 */
