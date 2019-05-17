import { BinarySearchTree } from "./binaryTree";

/**
 * A binary search tree was created by traversing through an array from
 * left to right and inserting each element. Given a binary search
 * tree with distinct elements, print all possible arrays that could have led to this tree.
 * EXAMPLE Input: 
 *       2
 *     1   3
 * 
 * Output: {2, 1, 3}, {2, 3, 1}
 * 
 * solution 1:
 * using recursion:
 * base case: input tree is null: return [] for no possible sub pattern be made here
 * what to always return: always return an array of arrays, each sub array is a possible
 *   pattern. (except base case, it's an 1-d array)
 * what to do with returns:
 * go through left side returns one by one,
 *   each one would concat with each of the right side patterns
 *   prepend current node value to that concated array and then enter it to a main
 *   array
 * do the same with right side returns
 * 
 * return the main array
 */

function mergeArrays (fromArrs: Array<any>, toArrs: Array<any>) {
  const mergedArrs = [];
  fromArrs.forEach((fromArr) => {
    if (toArrs.length) {
      toArrs.forEach((toArr) => {
        mergedArrs.push([...fromArr, ...toArr]);
      });
    } else {
      mergedArrs.push(fromArr);
    }
  });

  return mergedArrs;
}

export function BSTSequences (tree: BinarySearchTree) {
  if (!tree) {
    return [];
  }

  let leftSidePatterns = BSTSequences(tree.leftChild as BinarySearchTree);
  let rightSidePatterns = BSTSequences(tree.rightChild as BinarySearchTree);
  leftSidePatterns = mergeArrays(leftSidePatterns, rightSidePatterns);
  leftSidePatterns = leftSidePatterns.map((pattern) => [tree.value, ...pattern]);
  rightSidePatterns = mergeArrays(rightSidePatterns, leftSidePatterns);
  rightSidePatterns = rightSidePatterns.map((pattern) => [tree.value, ...pattern]);
  
  return !leftSidePatterns.length && !rightSidePatterns.length
    ? [[tree.value]]
    : [...leftSidePatterns, ...rightSidePatterns];
}