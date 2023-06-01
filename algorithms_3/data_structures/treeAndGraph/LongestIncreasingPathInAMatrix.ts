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
 */