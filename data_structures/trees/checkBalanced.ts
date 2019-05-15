/**
 * Check Balanced: Implement a function to check if a binary tree is balanced.
 * For the purposes of this question, a balanced tree is defined to be a tree
 * such that the heights of the two sub trees of any node never differ by more than one.
 * 
 * get min and max path of each node, for a parent node, you will have 2 min and
 * 2 max total, get the max and min out of these 4 numbers, and the difference
 * between these 2 numbers will be the difference from this node and down
 * return these 2 numbers after incrementing each by 1 (adding cur depth)
 * 
 * we can use recursion to solve this:
 * base case: keep calling, that means you will end up with a leaf node, return
 * { min: 0, max: 0 }
 * what to do with returns?
 *   you should have two sets of minMax (one from left, one from right)
 *   get the new min max by comparing these 4 numbers
 *   ++newMin ++newMax and return them
 * what to always return { min: n, max: n }
 * how to make problem smaller:
 *   call left child then call right child
 * 
 * the recursion will be done in one function
 * but there will be another function that calls that function to return a
 * boolean value instead of { min, max }
 * just need to return if max is larger than min by more than 1
 * 
 * time and space:
 * you will go through each node, so that is N (for the amount of the node +
 * leaf) or more precisely: branch ** (depth): 2 ** (logN + 1);
 * 
 * space
 * recursion will take as much space as depth + 1 so logN + 1
 */