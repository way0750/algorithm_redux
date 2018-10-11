// Given a binary tree, return all paths from the root to leaves.
// For example, given the tree (excuse the formatting, 4 and 5 branch from 3):
//  1
// / \
// 2 3
//  / \
//  4 5
// It should return [[1, 2], [1, 3, 4], [1, 3, 5]]

/**
 * solution 1: recursion
 * do a depth first search and return all value from leaf to root
 * 
 * base case: if node has not children at all
 *   return [[self.value]], as a collection of just one path which is consisted just the value of the leaf node
 *   but later on as the call stack returns, values from higher up on the tree will be prepended to each path
 * what to always return: an array of sub-arrays, each sub-array is a path
 * what to do with each return, add current node value to each and every single one of the sub array
 * how to make problem smaller: call each one of the node's children
 */

export function depthFirstSearch(node) {
  // to deal with edge case when no node is passed in
  if (!node) {
    return [];
  } else if (!node.left && !node.right) {
    // when no child at all, return [[ self value ]];
    return [[node.value]];
  }
  const leftPaths = depthFirstSearch(node.left);
  const rightPaths = depthFirstSearch(node.right);
  const allPaths = [...leftPaths, ...rightPaths];
  // add current node value to all sub paths
  return allPaths.map((path) => [node.value, ...path]);
};

describe('depth first search', () => {
  it('emtpy node should return []', () => {
    const tree = null;
    expect(depthFirstSearch(tree)).to.deep.equal([]);
  });
  it('should return example return for the above example', () => {
    const tree = { value: 1, left: { value: 2 }, right: { value: 3, left: { value: 4 }, right: { value: 5 } } };
    const expectedValue = [
      [1, 2],
      [1, 3, 4],
      [1, 3, 5]
    ];
    expect(depthFirstSearch(tree)).to.deep.equal(expectedValue);
  });
});