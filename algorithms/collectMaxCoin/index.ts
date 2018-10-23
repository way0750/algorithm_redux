// You are given a 2-d matrix where each cell represents number of coins in that cell.
// Assuming we start at matrix[0][0], and can only move right or down, find the maximum number of coins you
// can collect by the bottom right corner.
// For example, in this matrix
// 0 3 1 1
// 2 0 0 4
// 1 5 3 1
// The most we can collect is 0 + 2 + 1 + 5 + 3 + 1 = 12 coins.

/**
 * solution 1: use dynamic programming
 * loop from the very last cell, to its far left, then same for the upper row one by one.
 * In that case you are pretty much creating all possible sub case/problem all. And each sub case/problem
 * can reuse result from its immedite right cell and immedite bottom cell. 
 * at the very end, just return the value at matrix[0][0]
 */