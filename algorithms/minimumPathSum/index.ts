import { nodes } from "../maze";

/**
  Given a binary tree, find a minimum path sum from root to a leaf.

  For example, the minimum path in this tree is [10, 5, 1, -1], which has sum 15.

    10
  /  \
  5    5
  \     \
    2    1
        /
      -1

  this is essentially a binary tree depth search challenge, except you need to
  find a cumulative sub tree sum and return the smallest of them all.

  so we can use recursion for this

  recursive case:
    if the child has value
  what data type to ALWAYS return 
    always return a number, and it means the min path sum
  what to do with the return
    since we will recursively calling with each of the 2 children nodes
    we will have two returns from sub trees,
    we will take the smallest and sum it with the current node's value
  how to make problem smaller
    recursively call left and right
 */

export function minPathSum(node): number {
  const leftMinSum = node.left === undefined ? Infinity : minPathSum(node.left);
  const rightMinSum = node.right === undefined ? Infinity : minPathSum(node.right);

  let curMinPathSum = Math.min( leftMinSum, rightMinSum );
  // just in case the curMinPath sum is Infinity due to current node having no child.
  curMinPathSum = curMinPathSum === Infinity ? 0 : curMinPathSum;

  return node.value + curMinPathSum;
}

describe('Test minPathSum', () => {
  it('should return correctly for the example above', () => {
    /**
     * 
        10
      /  \
      5    5
      \     \
        2    1
            /
          -1
     */
    const tree = {
      value: 10, 
      left: { value: 5, right: { value: 2 } },
      right: {
        value: 5,
        right: { value: 1, left: { value: -1 } }
      }
    }

    expect(minPathSum(tree)).to.equal(15);
  });
  it('should return 20', () => {
    /**
     * 
        10
      /  \
      5    5
      \     \
        5    100
            /
          91
     */
    const tree = {
      value: 10, 
      left: { value: 5, right: { value: 5 } },
      right: {
        value: 5,
        right: { value: 100, left: { value: 91 } }
      }
    }

    expect(minPathSum(tree)).to.equal(20);
  });
});