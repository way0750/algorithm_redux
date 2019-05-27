/**
 * Random Node: You are implementing a binary tree class from scratch which,
 * in addition to insert, find, and delete, has a method getRandomNode() which
 * returns a random node from the tree. All nodes should be equally likely
 * to be chosen. Design and implement an algorithm for getRandomNode, and
 * explain how you would implement the rest of the methods.
 * 
 * insert just recursively insert new value, but of course, if value should go
 * left but there isn't a left child, then just simply make it the left child
 * to get random node
  turn the tree into an in order tree
  and then do the usual, get a random number, and map it over to the length of the
  array, this gives you the random index, return element at that index

  time and and space:
  time: generation the array will essentially go through all the nodes
  so if there are n nodes, the time would be n
  space:
  if you recursive turn the tree into array, then it would be of depth logN
  and you will have an array size of n
  so logN + N

  this is not the fastest way to do it, but I am bored of this, and just want
  to get it done and over with
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
        newNode.parent = this;
      } else {
        this.rightChild.insert(newNode);
      }
    } else {
      if (!this.leftChild) {
        this.leftChild = newNode;
        newNode.parent = this;
      } else {
        this.leftChild.insert(newNode);
      }
    }
  }

  // find in order
  public find(callBack) {
      return !!(this.leftChild && this.leftChild.find(callBack))
      || !!callBack(this)
      || !!(this.rightChild && this.rightChild.find(callBack));
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
      this.treeTop.insert(newNode);
    }
    return ++this.length;
  }

  public find(callBack) {
    return this.treeTop ? this.treeTop.find(callBack) : false;
  }

  public toArray() {
    const arr = [];
    if (this.treeTop) {
      this.treeTop.find((node) => {
        arr.push(node.value);
        return false; // to keep the loop going;
      });
    }
    return arr;
  }

  public deleteNode(deleteNode: TreeNode) {
    if (!deleteNode) {
      return;
    }
    // get replacementNode:
    let replacementNode = this.getFurthestLeftNode(deleteNode.rightChild) || deleteNode.leftChild;
    // if can't find a replacement node
    // and deleteNode is the top most node, then it's the only node left
    // but if it is not the top most node, then it is the only at that path
    if (!replacementNode) {
      if (deleteNode === this.treeTop) {
        this.treeTop = null;
      } else {
        if (deleteNode === deleteNode.parent.leftChild) {
          deleteNode.parent.leftChild = null;
        } else {
          deleteNode.parent.rightChild = null;
        }
        deleteNode.parent = null
      }
      // short cut the return, nothing more to do anyway
      return;
    }

    // handle the case where the replace node has a right child
    const replacementNodeRight = replacementNode.rightChild;
    if (replacementNodeRight) {
      // from parent to child
      if (replacementNode.parent.leftChild === replacementNode) {
        replacementNode.parent.leftChild = replacementNodeRight
      } else {
        replacementNode.parent.rightChild = replacementNodeRight
      }
      // from child to parent
      replacementNodeRight.parent = replacementNode.parent;

      // detach replacementNode's old parent and child references
      replacementNode.parent = null;
      replacementNode.rightChild = null;
    }

    // detach the link between replacementNode and it's parent
    if (replacementNode.parent && replacementNode.parent.leftChild === replacementNode) {
      replacementNode.parent.leftChild = null;
    } else if (replacementNode.parent && replacementNode.parent.leftChild === replacementNode) {
      replacementNode.parent.rightChild = null;
    }
    replacementNode.parent = deleteNode.parent;

    // let replacementNode take deleteNode children
    // and let those same children link to replacementNode
    // then we can detach deleteNode from all of its parent and children
    if (deleteNode.parent && deleteNode.parent.leftChild === deleteNode) {
      deleteNode.parent.leftChild = replacementNode;
    }
    if (deleteNode.parent && deleteNode.parent.rightChild === deleteNode) {
      deleteNode.parent.rightChild = replacementNode;
    }

    if (deleteNode.leftChild && deleteNode.leftChild !== replacementNode) {
      replacementNode.leftChild = deleteNode.leftChild;
      replacementNode.leftChild.parent = replacementNode;
    }
    if (deleteNode.rightChild && deleteNode.rightChild !== replacementNode) {
      replacementNode.rightChild = deleteNode.rightChild;
      replacementNode.rightChild.parent = replacementNode;
    }

    deleteNode.leftChild = null;
    deleteNode.rightChild = null;
    deleteNode.parent = null;
    if (deleteNode === this.treeTop) {
      this.treeTop = replacementNode;
    }

    return --this.length;
  }

  public getRandomNode() {
    const randomIndex = Math.floor(Math.random() * this.length);
    const nodeValues = this.toArray();
    return nodeValues[randomIndex];
  }

  private getFurthestLeftNode(node) {
    let leftMost = node;
    while (node) {
      leftMost = node
      node = node.leftChild;
    }

    return leftMost;
  }
}

describe('Binary Search Tree', () => {
  describe('basic functions tests', () => {
    let tree
    beforeEach(() => {
      tree = new BinaryTree();
      tree.insert(4);
      tree.insert(2);
      tree.insert(6);
      tree.insert(1);
      tree.insert(3);
      tree.insert(5);
      tree.insert(7);
    });
    it('should instantiate', () => {
      const arr = tree.toArray();
      expect(arr).to.eql([1,2,3,4,5,6,7]);
    });

    it('should furthest left node', () => {
      let furthestLeftNode = (tree as any).getFurthestLeftNode(tree.treeTop.rightChild);
      expect(furthestLeftNode.value).to.eql(5);

      furthestLeftNode = (tree as any).getFurthestLeftNode(tree.treeTop.rightChild.leftChild);
      expect(furthestLeftNode.value).to.eql(5);

      furthestLeftNode = (tree as any).getFurthestLeftNode(tree.treeTop);
      expect(furthestLeftNode.value).to.eql(1);
    });

    it('should delete node', () => {
      let nodeToDelete = (tree as any).treeTop.rightChild;
      tree.deleteNode(nodeToDelete);
      let arr = tree.toArray();
      expect(arr).to.eql([1,2,3,4,5,7]);

      nodeToDelete = (tree as any).treeTop.leftChild;
      tree.deleteNode(nodeToDelete);
      arr = tree.toArray();
      expect(arr).to.eql([1,3,4,5,7]);

      nodeToDelete = (tree as any).treeTop.leftChild;
      tree.deleteNode(nodeToDelete);
      arr = tree.toArray();
      expect(arr).to.eql([1,4,5,7]);

      nodeToDelete = (tree as any).treeTop.leftChild;
      tree.deleteNode(nodeToDelete);
      arr = tree.toArray();
      expect(arr).to.eql([4,5,7]);

      nodeToDelete = (tree as any).treeTop;
      tree.deleteNode(nodeToDelete);
      arr = tree.toArray();
      expect(arr).to.eql([5,7]);

      nodeToDelete = (tree as any).treeTop.rightChild;
      tree.deleteNode(nodeToDelete);
      arr = tree.toArray();
      expect(arr).to.eql([5]);


      nodeToDelete = (tree as any).treeTop;
      tree.deleteNode(nodeToDelete);
      arr = tree.toArray();
      expect(arr).to.eql([]);
    });
    it('should be able to find a node with value 7', () => {
      expect(tree.find((node) => node.value === 7)).to.be.true;
      expect(tree.find((node) => node.value === 77)).to.be.false;
    });
  });
  describe('get random node', () => {
    let tree
    beforeEach(() => {
      tree = new BinaryTree();
      tree.insert(4);
      tree.insert(2);
      tree.insert(6);
      tree.insert(1);
      tree.insert(3);
      tree.insert(5);
      tree.insert(7);
    });
    it('should return', () => {
      let randomNum = sandbox.stub(Math, 'random').returns(0);
      const nodeArr = tree.toArray();
      let value = tree.getRandomNode();
      expect(nodeArr[0]).to.eql(value);

      randomNum.returns(0.99);
      value = tree.getRandomNode();
      expect(nodeArr[6]).to.eql(value);

      randomNum.returns(0.5);
      value = tree.getRandomNode();
      expect(nodeArr[3]).to.eql(value);
    });
  });
});