/**
 * Largest Smaller BST Key
  Given a root of a Binary Search Tree (BST) and a number num, implement an efficient function findLargestSmallerKey that finds the largest key in the tree that is smaller than num. If such a number doesn’t exist, return -1. Assume that all keys in the tree are nonnegative.

  Analyze the time and space complexities of your solution.

  For example:

  For num = 17 and the binary search tree below:

  solution 1:
  use recursion:
  base base: if input node is null, return -1
    if input node key is smaller or equal then current node key
       and there is no left child, return -1
    if input node key is larger than current node key
       and there is no right child, return current node key
    
  what to always return: a number, potentially -1
  what to do with returns: just keep on returning it
  how to make problem smaller:
    if input node value is larger than current node value,
      call current node right child
    if input node value is smaller or equal than current node value
      call current node left child
 */

 /*********************************************************
 * CODE INSTRUCTIONS:                                    *
 * 1) The method findLargestSmallerKey you're            *
 *    asked to implement is located at line 26.          *
 * 2) Use the helper code below to implement it.         *
 * 3) In a nutshell, the helper code allows you to       *
 *    to build a Binary Search Tree.                     *
 * 4) Jump to line 71 to see an example for how the      *
 *    helper code is used to test findLargestSmallerKey. *
 *********************************************************/

/*
brain storm here:

we could use recursion to find it...

basecase
  if tree is null: return -1?
what to always return
  a number, always
what to do with the return
  check and see if the return is -1
  if yes, then return current node value
  else then keep on returning that return
how to make problem smaller
  if current node value is smaller or equal than num
    then recursively call with left child
  else if curretn node value is larger than num
    then recursively call with right hicld
*/


// Constructor to create a new Node
export function Node(key) {
  this.key = key;
  this.parent = null;
  this.left = null;
  this.right = null;
}

// Constructor to create a new BST 
function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype.findLargestSmallerKey = function(num, node = this.root) {
  if (!node) {
    return -1;
  }

  if (num <= node.key) {
    return this.findLargestSmallerKey(num, node.left);
  } else {
    const rightSideReturn = this.findLargestSmallerKey(num, node.right);
    return Math.max(node.key, rightSideReturn);
  }
}

// Creates a new node by a key and inserts it to the BST
BinarySearchTree.prototype.insert = function(key) {
  var root = this.root;

  // 1. If the tree is empty, create the root
  if(!root) {
      this.root = new Node(key);
      return;
  }

  // 2) Otherwise, create a node with the key
  //    and traverse down the tree to find where to
  //    to insert the new node
  var currentNode = root;
  var newNode = new Node(key);

  while(currentNode !== null) {
      if(key < currentNode.key) {
          if(!currentNode.left) {
              currentNode.left = newNode;
              newNode.parent = currentNode;
              break;
          } else {
              currentNode = currentNode.left;
          }
      } else {
          if(!currentNode.right) {
              currentNode.right = newNode;
              newNode.parent = currentNode;
              break;
          } else {
              currentNode = currentNode.right;
          }
      }
  }
}

/*********************************************
 * Driver program to test above function     *
 *********************************************/

// Create a Binary Search Tree
var bst = new BinarySearchTree();
bst.insert(20);
bst.insert(9);
bst.insert(25);
bst.insert(5);
bst.insert(12);
bst.insert(11);
bst.insert(14);

var result = bst.findLargestSmallerKey(17);
console.log("Largest smaller number is " + result);

result = bst.findLargestSmallerKey(2);
console.log("Largest smaller number is " + result);