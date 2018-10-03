import { expect } from 'chai';
/**
 * 
  A unival tree (which stands for "universal value") is a tree where all nodes under it have the same value.

  Given the root to a binary tree, count the number of unival subtrees.

  For example, the following tree has 5 unival subtrees:

    0
    / \
  1   0
      / \
    1   0
    / \
  1   1

 *
 * solution 1
 * write two functions: search and countUnivalTree
 * search will recursively search through the entire tree and return and object which keep track of
 * if the sub tree has been broken (having different value) and the amount of sub tree
 * 
 * countUnivalTree will call search, then return the count which search returns
 * 
 * 
 * this will use recursion
 * base case: input node is undefined/null, return
 *   { doesSubTreeHaveUniVal: true, count: 0 }
 * what to return always: { doesSubTreeHaveUniVal: boolean, count: number }
 * what to do with return: sum the counts up
 * how to make problem smaller: recursively call left child, then right child
 */

function searchSubTree(node?: { value: number, left?: any, right?: any }) {
  const defaultSearchState = {
    subTreeSameVal: true,
    count: 0
  }
  // base case
  if (!node) {
    return defaultSearchState;
  }

  const leftSearchState = searchSubTree(node.left);
  const rightSearchState = searchSubTree(node.right);
  defaultSearchState.count += (leftSearchState.count + rightSearchState.count);

  const isLeftSameValAsNode = node.left ? node.value === node.left.value : true;
  const isRightSameValAsNode = node.right ? node.value === node.right.value : true;
  const allSubTreeSameVal = leftSearchState.subTreeSameVal && rightSearchState.subTreeSameVal;
  if (allSubTreeSameVal && isLeftSameValAsNode && isRightSameValAsNode) {
    defaultSearchState.count++;
  } else {
    defaultSearchState.subTreeSameVal = false;
  }

  return defaultSearchState;
}

function countUnivalTree(node?: { value: number, left?: any, right?: any }) {
  const countState = searchSubTree(node);
  return countState.count;
}

describe('unival tree', () => {
  const tree1 = {
    value: 0,
    left: { value: 1 },
    right: {
      value: 0,
      left: { value: 1, left: { value: 1 }, right: { value: 1 } },
      right: { value: 0 }
    }
  }
  it('should be able to handle a simple binary tree', () => {
    const tree = {
      value: 0
    };
    const count = countUnivalTree(tree);
    expect(count).to.equal(1);
  });
});