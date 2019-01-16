/**
 * Given an integer, find the next permutation of it in absolute order.
 * For example, given 48975, the next permutation would be 49578.
 * 
 * solution: go from right to left and find the first digit that is smaller than the one on immediate right
 * that is the first digit that you can switch with anything on the right
 * then swap with the smallest of the larger number on the right
 * then reverse the entire right section
 * put everything back together into a number
 */