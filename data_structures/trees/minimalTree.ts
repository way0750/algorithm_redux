import { BinarySearchTree, toArray, ORDERS } from "./binaryTree";

/**
 * Minimal Tree: Given a sorted (increasing order) array with unique integer elements, write an algorithm to create a binary search tree with minimal height.
 * 
 * solution 1:
 * recursively do this:
 * input an array, take the middle node, the recursively call the remaining left
 * side of the array, and assign the return as the left child, do the same with
 * right side of remaining array
 * 
 * base case: input is an empty array return null for leaf
 * what to always return: a node or a null pointer
 * what to do with returns:
 *   if it is from left, then assign as left child
 *   if it is from right, then assign as right child
 * how to make problem smaller:
 *   take center value and make it the center node
 *   call left side of the array
 *   call right side of the array
 * 
 * time and space:
 * time, you will go through every node so N
 * space: the depth of recursion will be logN, and the final space will be N
 * N > logN so N
 */

export function minimalTree(numbers): BinarySearchTree {
  if (!numbers.length) {
    return null;
  }

  const centerIndex = Math.floor(numbers.length / 2);
  const centerNode = new BinarySearchTree(numbers[centerIndex]);
  const leftChild = minimalTree(numbers.slice(0, centerIndex));
  const rightChild = minimalTree(numbers.slice(centerIndex + 1));
  centerNode.addLeftChild(leftChild);
  centerNode.addRightChild(rightChild);

  return centerNode;
}

describe('Minimal Tree', () => {
  it('should return null for empty array', () => {
    const numbers = [];
    expect(minimalTree(numbers)).to.eql(null);
  });
  it('should return correctly for 1 2 3 4 5 6 7', () => {
    const numbers = [1,2,3,4,5,6,7];
    const tree = minimalTree(numbers);
    const treeToArray = toArray(tree, ORDERS.IN_ORDER);
    expect(treeToArray).to.eql(numbers);
  });
});