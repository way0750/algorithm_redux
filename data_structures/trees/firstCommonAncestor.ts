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

export function getFirstCommonAncesotr(tree: BinaryTree, nodeA: BinaryTree, nodeB: BinaryTree)  {
  let nodeSearchCount = 2;
  function search(tree) {
    const foundNodes = [];
    if (tree === nodeA || tree === nodeB) {
      foundNodes.push(tree);
      nodeSearchCount--;
    }

    if (nodeSearchCount) {
      let leftReturnNode = search(tree.leftChild);
      if (leftReturnNode) {
        foundNodes.push(leftReturnNode);
      }
    }

    if(nodeSearchCount) {
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
}