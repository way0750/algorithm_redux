import { BinaryTree } from "./binaryTree";

/**
 * Design an algorithm and write code to find the first common ancestor of
 * two nodes in a binary tree. Avoid storing additional nodes in a
 * data structure. NOTE: This is not necessarily a binary search tree.
 * 
 * solution 1:
 * have two functions
 * first one is a parent function containing a shared state:
 * notFoundNodeCount = 2
 * and a recursive function to use depth first search to go through
 * the tree
 * and to handle the situation where the nodes are not found in the tree
 * 
 * the recursive function:
 * recursive case: keep calling if notFoundNodeCount is not 0
 * what to always return: a node, could be A, B, or common ancestor
 * what to do with return: if current node receive 1 node, return it
 *   if receive 2, return self node
 * how to make problem smaller:
 *   check self again A and B, then recursively call left and right
 */

export function getFirstCommonAncestor(tree: BinaryTree, nodeA: BinaryTree, nodeB: BinaryTree)  {
  let nodeSearchCount = 2;
  function search(tree) {
    const foundNodes = [];
    if (tree === nodeA || tree === nodeB) {
      foundNodes.push(tree);
      nodeSearchCount--;
    }

    if (nodeSearchCount && tree.leftChild) {
      let leftReturnNode = search(tree.leftChild);
      if (leftReturnNode) {
        foundNodes.push(leftReturnNode);
      }
    }

    if(nodeSearchCount && tree.rightChild) {
      let rightReturnNode = search(tree.rightChild);
      if(rightReturnNode) {
        foundNodes.push(rightReturnNode);
      }
    }

    if (foundNodes.length) {
      return foundNodes.length === 2 ? tree : foundNodes.pop();
    } else {
      return null;
    }
  }

  return tree ? search(tree) : null;
}

describe('First common ancestor', () => {
  let tree1;
  let tree2;
  let tree3;
  let tree4;
  let tree5;
  let tree6;
  let tree7;
  let tree8;
  let tree9;
  let tree10;
  let tree11;
  let tree12;
  let tree13;
  let tree14;
  let tree15;
  beforeEach(() => {
    tree1 = new BinaryTree(1);
    tree2 = new BinaryTree(2);
    tree3 = new BinaryTree(3);
    tree4 = new BinaryTree(4);
    tree5 = new BinaryTree(5);
    tree6 = new BinaryTree(6);
    tree7 = new BinaryTree(7);
    tree8 = new BinaryTree(8);
    tree9 = new BinaryTree(9);
    tree10 = new BinaryTree(10);
    tree11 = new BinaryTree(11);
    tree12 = new BinaryTree(12);
    tree13 = new BinaryTree(13);
    tree14 = new BinaryTree(14);
    tree15 = new BinaryTree(15);
    tree1.addLeftChild(tree2);
    tree1.addRightChild(tree3);
    tree2.addLeftChild(tree4);
    tree2.addRightChild(tree5);
    tree4.addLeftChild(tree8);
    tree4.addRightChild(tree9);
    tree5.addLeftChild(tree10);
    tree5.addRightChild(tree11);
    tree3.addLeftChild(tree6);
    tree3.addRightChild(tree7);
    tree6.addLeftChild(tree12);
    tree6.addRightChild(tree13);
    tree7.addLeftChild(tree14);
    tree7.addRightChild(tree15);
  });
  it('should return right ancestor', () => {
    const result = getFirstCommonAncestor(tree1, tree8, tree5);
    expect(result.value).to.eql(2);
  });
  it('should return right ancestor', () => {
    const result = getFirstCommonAncestor(tree1, tree8, tree15);
    expect(result.value).to.eql(1);
  });
  it('should return right ancestor', () => {
    const result = getFirstCommonAncestor(tree1, tree12, tree15);
    expect(result.value).to.eql(3);
  });
  it('should return right ancestor', () => {
    const result = getFirstCommonAncestor(null, null, null);
    expect(result).to.eql(null);
  });
});