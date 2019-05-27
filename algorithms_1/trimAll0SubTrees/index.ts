/**
 * give a binary tree consisted of nodes that have only either 1 or 0 as value
 * trim the tree of any sub tree that is consisted of only 0s.
 *      0
 *     / \
 *    1   0
 *       / \
 *      1   0
 *     / \
 *    0   0
 * 
 * the tree should be trimmed into:
 *      0
 *     / \
 *    1   0
 *       /
 *       1
 * 
 * 
 * use recursion to check if sub tree is all 0s
 * 
 * base case
 *    Or if current node is null/undefined, return null
 * 
 * what to do with return?????
 *   meaning the left/right child has return itself, no need to do anything
 *   because that node still the child node
 *   if return is null, remove that child
 * 
 * what to always return:
 *    always return object: node / null
 * 
 * how to make problem "smaller"/recursively call?
 *   just call left and right child...
 *   then return self if current node is 1 or return null if current node is 0
 * 
 * 
 * time and space complexity
 * if n is the total amount of nodes in the tree
 * time: we would go through each and every single node once, 
 *   and we would also call twice more for each left node
 * over all a bit more than n
 * depth = logN
 * total depth would be depth + 1
 * !(logN + 1)
 * 
 * space:
 *  the returned tree:
 *  at worse it would be the same as the tree
 *  at best would be none
 * 
 *  the recursively stack:
 *  at worse it would be the depth + 1
 *  so logN + 1
 * 
 */

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

export function trimTree (node: TreeNode): TreeNode | null {
  if (!node) {
    return undefined;
  }

  // if the call return undefined then return that child
  if (!trimTree(node.left)) {
    delete node.left;
  }
  // if the call return undefined then return that child
  if (!trimTree(node.right)) {
    delete node.right;
  }

  // If left or right child is still there, that means there are still sub trees
  if (node.left || node.right) {
    return node;
  } else {
    return node.value ? node : undefined;
  }
}

describe('trim sub trees', () => {
  it('should return like the example above', () => {
  /*
  *      0
  *     / \
  *    1   0
  *       / \
  *      1   0
  *     / \
  *    0   0
  */
    const tree = {
      value: 0,
      left: { value: 1},
      right: {
        value: 0,
        left: {
          value: 1, left: { value: 0 }, right: { value: 0 }
        },
        right: { value: 0 }
      }
    };
    const expectedReturn = {
      value: 0,
      left: { value: 1 },
      right: {
        value: 0,
        left: { value: 1 }
      }
    }
    expect(trimTree(tree)).to.eql(expectedReturn);
  });

  it('should return undefined if all sub trees are trimmed', () => {
  /*
  *      0
  *     / \
  *    0   0
  *       / \
  *      0   0
  *     / \
  *    0   0
  */
    const tree = {
      value: 0,
      left: { value: 0},
      right: {
        value: 0,
        left: {
          value: 0, left: { value: 0 }, right: { value: 0 }
        },
        right: { value: 0 }
      }
    };
    const expectedReturn = undefined;
    expect(trimTree(tree)).to.eql(expectedReturn);
  });

  it('should return just 1 node if all sub trees are 0', () => {
  /*
  *      1
  *     / \
  *    0   0
  *       / \
  *      0   0
  *     / \
  *    0   0
  */
    const tree = {
      value: 1,
      left: { value: 0},
      right: {
        value: 0,
        left: {
          value: 0, left: { value: 0 }, right: { value: 0 }
        },
        right: { value: 0 }
      }
    };
    const expectedReturn = {
      value: 1
    };
    expect(trimTree(tree)).to.eql(expectedReturn);
  });

  it('should return undefined if tree is empty', () => {
    const tree = undefined;
    const expectedReturn = undefined;
    expect(trimTree(tree)).to.eql(expectedReturn);
  });
});