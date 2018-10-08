/**
 * given a number and binary tree, return a boolean for if it is possible to have a root to leaf path sum up to a given number k
 * ex:     
 *     8
 *    / \
 *   10  8
 * 
 * k = 18
 * then you should return true for that
 * 
 * solution 1:
 * just do a depth first search from root to leaf and then compare if the sum from root to leaf is === to k
 * 
 * can do this recursively
 * base case: node is null/undefined and accumlative value is same as k
 *   return true, else false
 * what to always return: boolean
 * what to do with return: if true, just keep returning it, if it is false, then keep search children
 * how to make problem smaller: pass self value to recursive call on children
 */

interface node {
  left: node;
  right: node;
  value: number;
}

function getTreePathSum(node: node, k, curPathSum: number = 0): boolean {
  // get to leaf node
  if (!node) {
    // if true, then tree can sum to k
    return curPathSum === k;
  }

  return getTreePathSum(node.left, k, node.value + curPathSum)
    || getTreePathSum(node.right, k, node.value + curPathSum);;
}
