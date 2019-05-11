/**
 * Implement a binary tree class
 * with these methods:
 * traversal: depth first, breadth first
 * search: depth first search, breadth first search
 * to Array: parent then all chilren left to right, this will make testing easier
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
  public leftChild: GenericTree = this.children[0];
  public rightChild: GenericTree = this.children[1];
  public isSearchTree: Boolean = false;
  public isBinaryTree: Boolean = true;

  constructor({ isSearchTree }) {
    super();
    this.isBinaryTree = isSearchTree;
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

const ORDERS = {
  IN_ORDER: 'in_order',
  PRE_ORDER: 'pre_order',
  POST_ORDER: 'post_order'
};

export function toArray(tree, order = ORDERS.PRE_ORDER) {
  if (!tree) {
    return [];
  }

  // only binary trees can do in order traversal
  if (order === ORDERS.IN_ORDER && tree.isBinaryTree) {
    const leftSubArray = toArray(tree.leftChild, order);
    const rightSubArray = toArray(tree.rightChild, order);
    return [...leftSubArray, tree.value, ...rightSubArray] ;
  }
  
  const array = [];
  const allSubArray = tree.children.reduce((array, childNode) => {
    const subArray = toArray(childNode, order);
    array.push(...subArray);
    return array;
  }, []);

  if (order === ORDERS.PRE_ORDER) {
    array.push(tree.value, ...allSubArray);
  } else if (order === ORDERS.POST_ORDER) {
    array.push(...allSubArray, tree.value);
  }

  return array;
}

export function nodeCount(tree) {
  if (!tree) {
    return 0;
  } else {
    return tree.children.reduce((sum, childNode) => {
      return sum + nodeCount(childNode);
    }, 1);
  }
}

describe('Tree', () => {
  describe('Tree', () => {
    it('Should be able to create a tree', () => {
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
      const count = nodeCount(tree1);
      expect(count).to.eql(10);
    });
    it('Should be able to convert a tree into an array', () => {
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
      // pre order
      let valArr = toArray(tree1);
      expect(valArr).to.eql([1,2,5,6,7,8,9,10,3,4]);
      // default to pre order
      valArr = toArray(tree1);
      expect(valArr).to.eql([1,2,5,6,7,8,9,10,3,4]);

      // post order
      valArr = toArray(tree1, ORDERS.POST_ORDER);
      expect(valArr).to.eql([6,8,9,10,7,5,2,3,4,1]);
    });
  });
  describe('Binary Tree', () => {
  });
  describe('Binary Tree', () => {
  });
})