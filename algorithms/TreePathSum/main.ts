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
  left?: node;
  right?: node;
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

describe('tree path sum', () => {
  it('should return for the example above', () => {
    const tree = {
      value: 8,
      left: { value: 10 },
      right: { value: 8 }
    };
    const k = 18;
    expect(getTreePathSum(tree, k)).to.be.true;
  });
  it('should return false if can not sum up to k', () => {
    const tree = {
      value: 8,
      left: { value: 10 },
      right: { value: 8 }
    };
    const k = 28;
    expect(getTreePathSum(tree, k)).to.be.false;
  });
  it('should return false if no tree at all', () => {
    const k = 28;
    expect(getTreePathSum(null, k)).to.be.false;
  });

  it('should return true if one node and it is same value as k', () => {
    const value = 28;
    const tree = {
      value
    };
    expect(getTreePathSum(tree, value)).to.be.true;
  });
});