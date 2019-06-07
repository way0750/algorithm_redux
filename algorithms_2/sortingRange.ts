/**
 * given an array of integers, find the smallest index range that you have to
 * sort in order to sort the entire array
 * ex: [1 3 2 4]
 * return 1,2
 * meaning: you just need to sort the range 1..2 (inclusive) to make this array sorted
 * 
 * solution 1:
 * you can create a sorted version of the input array first 
 * then compare both version and see where the values first and last to appear.
 *   meaning comparing from front to back and back to front
 * time and space
 * time: first sorting the array could be nlogn
 * then comparing will be worst case n
 * so n + nlogn, which could be simplified to nlogn
 * space: n for the sorted version of the input array
 */