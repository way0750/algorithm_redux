import { LinkedList } from "../linkedList/linkedList";
import { BinaryTree } from "./binaryTree";

/**
 * List of Depths
 * Given a binary tree, design an algorithm which creates a linked list of all the nodes
 * at each depth (e.g., if you have a tree with depth 0, you'll have 0 linked lists).
 * 
 * basically level by level, put all the nodes of the same link into the same linklist
 * and one linklist per level
 * 
 * solution 1:
 * use the same old breadth first search using a stack and instantiate a new
 * link list per level, and put them as level nodes into that linklist
 * 
 * should return all of those link list in an array? object?
 * 
 * time and space:
 * time: you will go through each node so N
 * space: creating an array with bunch of link list, but the total amount of
 * link list nodes would be the same as the amount of tree nodes, so N again
 */

export function listOfDepths(binaryTree: BinaryTree): Array<LinkedList> {
  const linkLists: Array<LinkedList> = [];
  let curLevel = binaryTree ? [binaryTree] : [];
  while (curLevel.length) {
    const curLevelLinkList = new LinkedList();
    const nextLevelNodes = [];
    curLevel.forEach((node) => {
      curLevelLinkList.appendToTail(node);
      const { leftChild, rightChild } = node;
      if (leftChild) {
        nextLevelNodes.push(leftChild)
      }
      if(rightChild) {
        nextLevelNodes.push(rightChild);
      }
    });
    linkLists.push(curLevelLinkList);
    curLevel = nextLevelNodes;;
  }
  return linkLists;
}

describe('List of Depths', () => {
  it('Should return 3 link lists', () => {
    const n1 = null;
    const lists = listOfDepths(n1);
    expect(lists.length).to.eql(0);
  });
  it('Should return 3 link lists', () => {
    const n1 = new BinaryTree(1);
    const n2 = new BinaryTree(2);
    const n3 = new BinaryTree(3);
    const n4 = new BinaryTree(4);
    const n5 = new BinaryTree(5);
    const n6 = new BinaryTree(6);
    const n7 = new BinaryTree(7);
    n1.addLeftChild(n2);
    n1.addRightChild(n3);
    n2.addLeftChild(n4);
    n2.addRightChild(n5);
    n3.addLeftChild(n6);
    n3.addRightChild(n7);
    const lists = listOfDepths(n1);
    expect(lists.length).to.eql(3);
  });
  it('Should return 7 link lists', () => {
    const n1 = new BinaryTree(1);
    const n2 = new BinaryTree(2);
    const n3 = new BinaryTree(3);
    const n4 = new BinaryTree(4);
    const n5 = new BinaryTree(5);
    const n6 = new BinaryTree(6);
    const n7 = new BinaryTree(7);
    n1.addLeftChild(n2);
    n2.addLeftChild(n3);
    n3.addLeftChild(n4);
    n4.addLeftChild(n5);
    n5.addLeftChild(n6);
    n5.addLeftChild(n6);
    n5.addRightChild(n7);
    const lists = listOfDepths(n1);
    expect(lists.length).to.eql(6);
    const lastNodeInLastList = lists[lists.length - 1].getNthNode(2).value;
    expect(lastNodeInLastList.value).to.eql(7);
  });
});