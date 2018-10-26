// Given a matrix, write a function to determine whether the matrix is a Toeplitz matrix. A Toeplitz matrix  is a matrix in which each descending diagonal from left to right is constant.
// Follow-up question: Assume that the entire matrix cannot fit into memory and should be read from file. Assume that a few rows and all columns can be read in. How could we verify?
// Wikipedia: https://en.wikipedia.org/wiki/Toeplitz_matrix
// image: https://wikimedia.org/api/rest_v1/media/math/render/svg/ffb0725a08b85d5c447cbec3907e39b818d55941

/**
 * solution 1:
 * as you go through each row, just keep checking the current cell vaue against the one above and to the left
 * as soon as a inconsistent value found, return false;
 * 
 * solution 2:
 * maintain a row which is a copy of the very first row
 * then each time when you get access to the next row, you pop the last one since it's no longer needed
 * and push another number (the first one from the new row), to the front
 * then again, check new row's each index vaue against same index from the state maintaning row
 *   whenever found inconsistance return false;
 * 
 * solution 2 will be able to handle the follow-up question becaues it doesn't need to know the entire size of the matrix, and it
 * maintains the most current state in which we can use to check if there are inconsistances
 */