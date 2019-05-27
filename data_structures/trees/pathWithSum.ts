import { BinaryTree } from "./binaryTree";

/**
 * Paths with Sum: You are given a binary tree in which each node
 * contains an integer value (which might be positive or negative).
 * Design an algorithm to count the number of paths that sum to a given
 * value. The path does not need to start or end at the root or a
 * leaf, but it must go downwards (traveling only from parent nodes to child nodes).
 * 
 * solution 1:
 * each path in the tree, if you flatten it into an array, it's easier to solve this
 * k = 4
 * [10, 7, -17, 17, -17, 17, -17, 21, -21, 4, 0]
 * the basic idea:
 * 
 * all the running/accumulative sum:
 *      if the latest running sum - k result in a previous sum, that
 *      means a sub section can be summed up to k
 * ex: 
 *      |   |  <--- the difference 
 * -----
 * ---------
 * 
 * but of course there can be multiple running that are the same
 * so for this array
 * [10, 7, -17, 17, -17, 17, -17, 21, -21, 4, 0]
 * you have this running sum
 * [10, 17,  0, 17,   0, 17,   0, 21,   0, 4, 4]
 * turn this into a hash to make it easier to find the amount of sub array
 * to sum up to k:
 * {
 *   10: 1,
 *   17: 3,
 *   0: 4 + 1 (initialize it to 1 to deal with running sum that is the same as k)
 *   4: 2
 *   21: 1
 * }
 * 
 * so if running sum is 4 (first running sum, 4), and k = 4
 * so 4 - 4 === 0
 * use that 0 to find in the hash, how many sub array could be summed up to
 * current value to sum to k
 * in this case it is 5,
 * 
 * 
 * steps:
 * get running sum: previous sum + current value, that is the new running sum
 *   add +1 to hash[sum]
 * then current sum -  current number
 *   that's the key, use it to find total amount of sub arrays can sum up to k
 *   and end at current ele
 * then recursively keep calling with this hash
 * but when coming back up and up, -1 of current sum, you can't reuse it anymore
 * 
 * recursion:
 * base case:
 *   if node is null, return 0, that is the amount of sub array can be summed to k
 * what to return always: number, that is the total amount
 * what to do with returns: add them to current total, so current total +
 *   children total
 *   then before returning, -1 for current running sum
 * how to make problem smaller: recursively call left and right
 */

export function pathWithSum(tree, k, record = { 0: 1 }, runningSum = 0) {
  if (!tree) {
    return 0;
  }

  runningSum += tree.value;
  record[runningSum] = record[runningSum] || 0;
  record[runningSum]++;
  let totalPatterns = record[ runningSum - k ] || 0;
  totalPatterns += pathWithSum(tree.leftChild, k, record, runningSum);
  totalPatterns += pathWithSum(tree.rightChild, k, record, runningSum);
  record[runningSum]--;
  return totalPatterns;
}

describe('path with sum', () => {
  it('should return 3 for the example', () => {
    let tree1 = new BinaryTree(10);
    let tree2 = new BinaryTree(5);
    let tree3 = new BinaryTree(-3);
    let tree4 = new BinaryTree(3);
    let tree5 = new BinaryTree(1);
    let tree6 = new BinaryTree(11);
    let tree7 = new BinaryTree(3);
    let tree8 = new BinaryTree(-2);
    let tree9 = new BinaryTree(2);

    tree1.addLeftChild(tree2);
    tree1.addRightChild(tree3);
    tree2.addLeftChild(tree4);
    tree2.addRightChild(tree5);
    tree3.addRightChild(tree6);
    tree4.addLeftChild(tree7);
    tree4.addRightChild(tree8);
    tree5.addRightChild(tree9);

    const result = pathWithSum(tree1, 8);
    expect(result).to.eql(3);
  });
});