/**
 * Minimal Tree: Given a sorted (increasing order) array with unique integer elements,
 * write an algorithm to create a binary search tree with minimal height.
 * just recursive call with sub array to build sub search tree
 * 
 * base case: arr is empty, return null
 * what to always do with return:
 *      if called with left sub array, then just assigned the return value to left child
 *      same with right sub array
 * what to always return: a node, which is the top node of the sub tree. could be null too
 * how to break the problem smaller:
 *      get element at mid index, that the value for current node
 *      then use the mid index to slice the array into left sub array and right sub array
 * 
 * time: O(logN), space: O(N);
 */

export function makeBinarySearchTree (arr) {
    
}