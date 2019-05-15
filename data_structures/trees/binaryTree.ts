/**
 * Implement a binary tree class
 * with these methods:
 * traversal: depth first, breadth first
 * search: depth first search, breadth first search
 * to Array: parent then all children left to right, this will make testing easier
 * nodeCount: return the amount of nodes, to make it easier to test later
 */

export class GenericTree {
  public value: any;
  public children: Array<any> = [];
  constructor(value) {
    this.value = value;
  }
}

export class BinaryTree extends GenericTree {
  public leftChild: BinaryTree = this.children[0];
  public rightChild: BinaryTree = this.children[1];
  public isBinaryTree: Boolean = true;

  constructor(value) {
    super(value);
  }

  public addLeftChild(node) {
    this.leftChild = node;
    this.children[0] = node;
  }

  public addRightChild(node) {
    this.rightChild = node;
    this.children[1] = node;
  }
}

export class BinarySearchTree extends BinaryTree {
  public isSearchTree: Boolean = true;
}

/**
 * In order
 * Pre order
 * Post order
 * solution 1:
 * recursion:
 * if Tree is null, then return []
 * always return [] of nodes
 * call self or children depending on Tree type
 * combind return array with current array
 */

export const ORDERS = {
  IN_ORDER: 'in_order',
  PRE_ORDER: 'pre_order',
  POST_ORDER: 'post_order'
};

export function toArray(tree, order = ORDERS.PRE_ORDER) {
  const arr = [];
  treeTraversal(tree, (node) => arr.push(node.value), order);
  return arr;
}

export function treeTraversal(tree, callBack = (...args) => {}, order = ORDERS.PRE_ORDER) {
  if (!tree) {
    return;
  }

  // only binary trees can do in order traversal
  if (order === ORDERS.IN_ORDER && tree.isBinaryTree) {
    treeTraversal(tree.leftChild, callBack, order);
    callBack(tree);
    treeTraversal(tree.rightChild, callBack, order);
  }

  if (order === ORDERS.PRE_ORDER) {
    callBack(tree);
    tree.children.forEach((childNode) => {
      treeTraversal(childNode, callBack, order);
    });
  } else if (order === ORDERS.POST_ORDER) {
    tree.children.forEach((childNode) => {
      treeTraversal(childNode, callBack, order);
    });
    callBack(tree);
  }
}

/**
 * self value, then all the children
 */
export function depthFirstTreeSearch(tree, callBack) {
  if (!tree) {
    return false;
  } else if (callBack(tree)) {
    return true;
  }

  return tree.children.some((childNode) => {
    return depthFirstTreeSearch(childNode, callBack);
  });
}

export function nodeCount(tree) {
  let count = 0;
  treeTraversal(tree, () => ++count);
  return count;
}

describe('Tree', () => {
  describe('Tree', () => {
    let topTreeNode;
    beforeEach(() => {
      const tree1 = new GenericTree(1);
      const tree2 = new GenericTree(2);
      const tree3 = new GenericTree(3);
      const tree4 = new GenericTree(4);
      const tree5 = new GenericTree(5);
      const tree6 = new GenericTree(6);
      const tree7 = new GenericTree(7);
      const tree8 = new GenericTree(8);
      const tree9 = new GenericTree(9);
      const tree10 = new GenericTree(10);

      tree1.children.push(tree2, tree3, tree4);
      tree2.children.push(tree5);
      tree5.children.push(tree6, tree7);
      tree7.children.push(tree8, tree9, tree10);
      topTreeNode = tree1;
    });
    it('Should be able to create a tree', () => {
      const count = nodeCount(topTreeNode);
      expect(count).to.eql(10);
    });
    it('Should be able to convert a tree into an array', () => {

      // pre order
      let valArr = toArray(topTreeNode);
      expect(valArr).to.eql([1,2,5,6,7,8,9,10,3,4]);
      valArr = [];
      treeTraversal(topTreeNode, (tree) => {
        valArr.push(tree.value);
      }, ORDERS.PRE_ORDER);
      expect(valArr).to.eql([1,2,5,6,7,8,9,10,3,4]);

      // default to pre order
      valArr = toArray(topTreeNode);
      expect(valArr).to.eql([1,2,5,6,7,8,9,10,3,4]);

      // post order
      valArr = toArray(topTreeNode, ORDERS.POST_ORDER);
      expect(valArr).to.eql([6,8,9,10,7,5,2,3,4,1]);
    });
    it('Should be able to traversal through a tree', () => {
      const values = [];
      treeTraversal(topTreeNode, (node) => {
        values.push(node.value);
      });
      expect(values).to.eql([1,2,5,6,7,8,9,10,3,4]);
      expect(depthFirstTreeSearch(topTreeNode, (node) => node.value === 10 )).to.be.true;
      expect(depthFirstTreeSearch(topTreeNode, (node) => node.value === 11 )).to.be.false;
    });
  });

  describe('Binary Search Tree', () => {
    let topTreeNode;
    beforeEach(() => {
      const tree1 = new BinarySearchTree(1);
      const tree2 = new BinarySearchTree(2);
      const tree3 = new BinarySearchTree(3);
      const tree4 = new BinarySearchTree(4);
      const tree5 = new BinarySearchTree(5);
      const tree6 = new BinarySearchTree(6);
      const tree7 = new BinarySearchTree(7);
      const tree8 = new BinarySearchTree(8);
      const tree9 = new BinarySearchTree(9);
      const tree10 = new BinarySearchTree(10);

      tree4.addLeftChild(tree2);
      tree2.addLeftChild(tree1);
      tree2.addRightChild(tree3);
      tree4.addRightChild(tree7);
      tree7.addLeftChild(tree6);
      tree6.addLeftChild(tree5);
      tree7.addRightChild(tree9);
      tree9.addLeftChild(tree8);
      tree9.addRightChild(tree10);
      topTreeNode = tree4;
    });

    it('Should be able to create a Binary Search tree', () => {
      const count = nodeCount(topTreeNode);
      expect(count).to.eql(10);
      const values = toArray(topTreeNode, ORDERS.IN_ORDER);
      expect(values).to.eql([1,2,3,4,5,6,7,8,9,10]);
    });

    it('Should be able to go through a Binary Search tree', () => {
      const values = [];
      treeTraversal(topTreeNode, (node) => {
        values.push(node.value);
      }, ORDERS.IN_ORDER);
      expect(values).to.eql([1,2,3,4,5,6,7,8,9,10]);
      let found = depthFirstTreeSearch(topTreeNode, (node) => node.value === 7);
      expect(found).to.be.true;
      found = depthFirstTreeSearch(topTreeNode, (node) => node.value === 77);
      expect(found).to.be.false;
    });
  });
});