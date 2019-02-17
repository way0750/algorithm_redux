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
  it('should return like the example aobve', () => {
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
});