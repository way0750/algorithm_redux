import { BinaryTree } from "./binaryTree";

/**
 * Validate BST: Implement a function to check if a binary tree is a binary search tree.
 * 
 * you need to check if the largest value on left of current node is smaller or
 * equal to current value
 * and check if the smallest value on the right of current node is larger or
 * equal to current value
 * 
 * should return { min max } for the min and max value on each branch because
 * each sub branch doesn't know if it is on parent's left or right.
 * what if the tree isn't a binary search tree?
 * if we are using recursion... always return an object: { min, max, isBalanced }
 * or to make things more standardized, you can return always return 
 * { min, max, isBalanced: true/false }
 * so when it is not balanced:
 * { min: Infinity, max: -Infinity, isBalanced: false } all data types are consistent now
 * yeah do that. 
 * 
 * can use two functions
 * one to do the search and return that object { min, max, isBalanced }
 * another to pick the isBalanced value and return it
 * 
 * solution:
 * recursion:
 * recursive case: only recursively call on the left/right child if it exists
 * what to always return { min, max, isBalanced }
 * what to do with returns
 *   if any child returns isBalanced: false, just return that object
 * else compare current node value to min and max depending on which side the
 * recursive return is from
 * how to make the problem smaller:
 *   just recursively call left and then right
 * 
 * the main function: call the recursive search function, and then just return
 * the isBalanced value
 * what if the tree is null? just short cut return isBalanced: true to save time
 * 
 * time and space:
 * time: for the recursive function: you are searching through every single node
 * so n for the amount of node
 * and you don't really do any loop or anything anyway...
 * space:
 * the recursive stack.....logN done!
 */
const invalidMinMax = { min: Infinity, max: -Infinity, isBalanced: false };
function balanceSearch(tree: BinaryTree) {
  const minMax = { min: tree.value, max: tree.value, isBalanced: true };
  if(tree.leftChild) {
    const leftMinMax = balanceSearch(tree.leftChild);
    if (!leftMinMax.isBalanced || leftMinMax.max > tree.value) {
      return invalidMinMax;
    } else {
      minMax.min = leftMinMax.min;
    }
  }

  if(tree.rightChild) {
    const rightMinMax = balanceSearch(tree.rightChild);
    if (!rightMinMax.isBalanced || rightMinMax.min < tree.value) {
      return invalidMinMax;
    } else {
      minMax.max = rightMinMax.max;
    }
  }

  return minMax;
}

export function validateBST(tree) {
  if (!tree) {
    return true;
  }

  const searchResult = balanceSearch(tree);
  return searchResult.isBalanced;
}

describe('Validate BST', () => {
  it('Should return true for null', () => {
    expect(validateBST(null)).to.be.true;
  });
  it('Should return true for a binary search tree', () => {
    const n1 = new BinaryTree(1);
    const n2 = new BinaryTree(2);
    const n3 = new BinaryTree(3);
    const n4 = new BinaryTree(4);
    const n5 = new BinaryTree(5);
    const n6 = new BinaryTree(6);
    const n7 = new BinaryTree(7);
    n4.addLeftChild(n2);
    n4.addRightChild(n6);
    n2.addLeftChild(n1);
    n2.addRightChild(n3);
    n6.addLeftChild(n5);
    n6.addRightChild(n7);

    expect(validateBST(n4)).to.be.true;
  });
  it('Should return false for not a binary search tree', () => {
    const n0 = new BinaryTree(0);
    const n1 = new BinaryTree(1);
    const n2 = new BinaryTree(2);
    const n3 = new BinaryTree(3);
    const n4 = new BinaryTree(4);
    const n5 = new BinaryTree(5);
    const n6 = new BinaryTree(6);
    n4.addLeftChild(n2);
    n4.addRightChild(n6);
    n2.addLeftChild(n1);
    n2.addRightChild(n3);
    n6.addLeftChild(n5);
    n6.addRightChild(n0);

    expect(validateBST(n4)).to.be.false;
  });
});