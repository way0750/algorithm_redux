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
      linkLists.push(curLevelLinkList);
      curLevel = nextLevelNodes;;
    });
  }
  return linkLists;
}