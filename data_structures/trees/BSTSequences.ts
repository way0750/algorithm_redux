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
 * 
 * time and space:
 * space: 2NDepth**2
 * time: !(2NDepth**2)
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

  let mergedLeftSidePatterns = mergeArrays(leftSidePatterns, rightSidePatterns);
  mergedLeftSidePatterns = mergedLeftSidePatterns.map((pattern) => [tree.value, ...pattern]);
  let mergedRightSidePatterns = mergeArrays(rightSidePatterns, leftSidePatterns);
  mergedRightSidePatterns = mergedRightSidePatterns.map((pattern) => [tree.value, ...pattern]);
  
  return !mergedLeftSidePatterns.length && !mergedRightSidePatterns.length
    ? [[tree.value]]
    : [...mergedLeftSidePatterns, ...mergedRightSidePatterns];
}

describe('BSTSequences', () => {
  describe('Merge Array', () => {
    it('should merge both array of arrays', () => {
      const arr1 = [[1,2,3], [4,5,6]];
      const arr2 = [[7,8,9], [2,4,6]];
      expect(mergeArrays(arr1, arr2)).to.eql([
        [1,2,3,7,8,9],
        [1,2,3,2,4,6],
        [4,5,6,7,8,9],
        [4,5,6,2,4,6]
      ]);
    });
    it('should return first array, if second array is empty', () => {
      const arr1 = [[1,2,3], [4,5,6]];
      const arr2 = [];
      expect(mergeArrays(arr1, arr2)).to.eql(arr1);
    });
    it('should return empty array, if first array is empty', () => {
      const arr1 = [];
      const arr2 = [[1,2,3], [4,5,6]];
      expect(mergeArrays(arr1, arr2)).to.eql(arr1);
    });
  });
  describe('the actual BSTSequences', () => {
    it('should return correctly for a no-node-tree', () => {
      expect(BSTSequences(null)).to.eql([]);
    });
    it('should return correctly for a one-node-tree', () => {
      const tree = new BinarySearchTree(1);
      expect(BSTSequences(tree)).to.eql([[1]]);
    });
    it('should return correctly for a three-node-tree', () => {
      const tree1 = new BinarySearchTree(1);
      const tree2 = new BinarySearchTree(2);
      const tree3 = new BinarySearchTree(3);
      tree2.addLeftChild(tree1);
      tree2.addRightChild(tree3);
      expect(BSTSequences(tree2)).to.eql([[2,1,3], [2,3,1]]);
    });
    it('should return correctly for a bigger tree', () => {
      const n1 = new BinarySearchTree(1);
      const n2 = new BinarySearchTree(2);
      const n3 = new BinarySearchTree(3);
      const n4 = new BinarySearchTree(4);
      const n5 = new BinarySearchTree(5);
      const n6 = new BinarySearchTree(6);
      const n7 = new BinarySearchTree(7);
      n4.addLeftChild(n2);
      n4.addRightChild(n6)
      n2.addLeftChild(n1);
      n2.addRightChild(n3);
      n6.addLeftChild(n5);
      n6.addRightChild(n7);
      const result = BSTSequences(n4);
      const expected = [
        [4,2,1,3,6,5,7],
        [4,2,1,3,6,7,5],
        [4,2,3,1,6,5,7],
        [4,2,3,1,6,7,5],
        [4,6,5,7,2,1,3],
        [4,6,5,7,2,3,1],
        [4,6,7,5,2,1,3],
        [4,6,7,5,2,3,1]
      ];
      expect(result).to.eql(expected);
    });
  });
});