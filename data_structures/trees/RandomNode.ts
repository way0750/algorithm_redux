/**
 * Random Node: You are implementing a binary tree class from scratch which,
 * in addition to insert, find, and delete, has a method getRandomNode() which
 * returns a random node from the tree. All nodes should be equally likely
 * to be chosen. Design and implement an algorithm for getRandomNode, and
 * explain how you would implement the rest of the methods.
 * 
 * insert just recursively insert new value, but of course, if value should go
 * left but there isn't a left child, then just simply make it the left child
 */

class TreeNode {
  public leftChild?: TreeNode;
  public rightChild?: TreeNode;
  public parent?: TreeNode;
  public value?: number;
  constructor(value) {
    this.value = value;
  }

  public insert(newNode: TreeNode) {
    if (newNode.value > this.value) {
      if (!this.rightChild) {
        this.rightChild = newNode;
      } else {
        this.rightChild.insert(newNode);
      }
    } else {
      if (!this.leftChild) {
        this.leftChild = newNode;
      } else {
        this.leftChild.insert(newNode);
      }
    }
  }
}

export class BinaryTree {
  // this will be helpful to get random node
  public length = 0;
  public treeTop = null;

  // let's keep things simple and assume all values are just numbers
  public insert(value: number | TreeNode) {
    const newNode = typeof value === 'number' ? new TreeNode(value) : value;
    if(!this.treeTop) {
      newNode.parent = null;
      this.treeTop = newNode;
    } else {
      newNode.parent = this;
      this.treeTop.insert(newNode);
    }
  }

  public deleteNode(deleteNode: TreeNode) {
    // get replacementNode:
    let replacementNode = this.getFurthestLeftNodeOnRight(deleteNode.rightChild) || deleteNode.leftChild;
    // if can't find a replacement node, that means the deleteNode is the top
    // most node. so delete the 
    if (!replacementNode) {
      this.treeTop = null;
      return;
    }
    // the replacement node will not have a left child, but might have right
    const replacementNodeRight = replacementNode.rightChild;
    if (replacementNodeRight) {
      replacementNodeRight.parent = replacementNode.parent;
      if (replacementNode.parent.leftChild === replacementNode) {
        replacementNode.parent.leftChild = replacementNodeRight;
      } else {
        replacementNode.parent.rightChild = replacementNodeRight;
      }
    }

    // replacementNode assume the delete node's parent and children
    // both children will assume replacementNode as parent
    replacementNode.parent = deleteNode.parent
    if (deleteNode.parent && deleteNode.parent.leftChild === deleteNode) {
      deleteNode.parent.leftChild = replacementNode;
    } else if (deleteNode.parent && deleteNode.parent.rightChild === deleteNode) {
      deleteNode.parent.rightChild = replacementNode;
    }
    // replacementNode takes deleteNode's children
    replacementNode.leftChild = deleteNode.leftChild;
    replacementNode.rightChild = deleteNode.rightChild;
  }

  private getFurthestLeftNodeOnRight(node) {
    let leftMost = node;
    while (node) {
      leftMost = node
      node = node.leftChild;
    }

    return leftMost;
  }
}