import { BinaryTree } from "./binaryTree";
import { search } from "../../algorithms/alienDictionary/main";

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
