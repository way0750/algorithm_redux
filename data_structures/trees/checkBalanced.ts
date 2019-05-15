import { BinaryTree } from "./binaryTree";

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

function getMinMax(binaryTree: BinaryTree) {
  if (!binaryTree) {
    return { min: 0, max: 0 };
  }

  const leftMinMax = getMinMax(binaryTree.leftChild);
  const rightMinMax = getMinMax(binaryTree.rightChild);
  const newMin = Math.min(leftMinMax.min, leftMinMax.max, rightMinMax.min, rightMinMax.max);
  const newMax = Math.max(leftMinMax.min, leftMinMax.max, rightMinMax.min, rightMinMax.max);
  return {
    min: newMin + 1,
    max: newMax + 1
  };
}

export function checkBalanced(binaryTree): Boolean {
  const { min, max } = getMinMax(binaryTree);
  return (max - min) < 2;
}

describe('Check Balanced', () => {
  it('should return true for a balanced tree', () => {
    const n1 = new BinaryTree(1);
    const n2 = new BinaryTree(2);
    const n3 = new BinaryTree(3);
    const n4 = new BinaryTree(4);
    const n5 = new BinaryTree(5);
    const n6 = new BinaryTree(6);
    const n7 = new BinaryTree(7);
    n1.addLeftChild(n2);
    n1.addRightChild(n3);
    n2.addLeftChild(n4);
    n2.addRightChild(n5);
    n3.addLeftChild(n6);
    n3.addRightChild(n7);
    expect(checkBalanced(n1)).to.be.true;
  });
  it('should return false for a un-balanced tree', () => {
    const n1 = new BinaryTree(1);
    const n2 = new BinaryTree(2);
    const n4 = new BinaryTree(4);
    const n5 = new BinaryTree(5);
    n1.addLeftChild(n2);
    n2.addLeftChild(n4);
    n2.addRightChild(n5);
    expect(checkBalanced(n1)).to.be.false;
  });
  it('should return true for a tree that is unbalanced by only 1', () => {
    const n1 = new BinaryTree(1);
    const n2 = new BinaryTree(2);
    const n3 = new BinaryTree(3);
    const n4 = new BinaryTree(4);
    const n5 = new BinaryTree(5);
    n1.addLeftChild(n2);
    n1.addRightChild(n3);
    n2.addLeftChild(n4);
    n2.addRightChild(n5);
    expect(checkBalanced(n1)).to.be.true;
  });
});