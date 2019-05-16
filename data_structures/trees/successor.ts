import { BinarySearchTree, BinaryTree } from "./binaryTree";

/**
 * Write an algorithm to find the "next" node (i.e., in-order successor) of a given node in a
 * binary search tree. You may assume that each node has a link to its parent.
 * 
 * the next parent node. essentially it is the first node on the current node's left:
 * it could be it's right child/sub tree's further LEFT node
 * or if it has no right descendence, get it first parent that is on the right side
 * 
 * solution 1:
 * if given node has the right child, then find the leftest child on that sub tree
 * if given node has no right child, then find the parent that is the first on
 * the top tree's right
 * 
 * time and space:
 * we will go up and down on the tree
 * worst time complexity would be the depth, so if N === total amount of nodes,
 * the logN
 * 
 * space, we will just maintain a handful a state, so constant.
 */

function getFurthestLeftChild(tree: BinaryTree) {
  let curLeft = tree;
  let nextLeft = tree.leftChild;
  while(nextLeft) {
    curLeft = nextLeft;
    nextLeft = curLeft.leftChild;
  }

  return curLeft;
}

function getFurthestRightParent(tree: BinaryTree) {
  let curNode = tree;
  let curParent = tree.parent;
  while (curParent) {
    //if current node is the leftChild of the parent
    if (curNode === curParent.leftChild) {
      return curParent;
    } else {
      curNode = curParent;
      curParent = curNode.parent;
    }
  }

  return null;
}

export function successor (tree: BinarySearchTree) {
  if (tree.leftChild) {
    return getFurthestLeftChild(tree.rightChild);
  } else {
    return getFurthestRightParent(tree);
  }
}

describe('Successor', () => {
  let tree4;
  let tree3;
  let tree7;
  beforeEach(() => {
    let tree1 = new BinaryTree(1);
    let tree2 = new BinaryTree(2);
    tree3 = new BinaryTree(3);
    tree4 = new BinaryTree(4);
    let tree5 = new BinaryTree(5);
    let tree6 = new BinaryTree(6);
    tree7 = new BinaryTree(7);
    tree4.addLeftChild(tree2);
    tree4.addRightChild(tree6);
    tree2.addParent(tree4);
    tree2.addLeftChild(tree1);
    tree2.addRightChild(tree3);
    tree6.addParent(tree4);
    tree6.addLeftChild(tree5);
    tree6.addRightChild(tree7);
    tree1.addParent(tree2);
    tree3.addParent(tree2);
    tree5.addParent(tree6);
    tree7.addParent(tree6);
  });
  it('Should return the right child furthest left child as next successor', () => {
    expect(successor(tree4).value).to.eql(5);
  });
  it('Should return the first parent on the right as next successor', () => {
    expect(successor(tree3).value).to.eql(4);
  });
  it('Should return null as next successor', () => {
    expect(successor(tree7)).to.eql(null);
  });
});