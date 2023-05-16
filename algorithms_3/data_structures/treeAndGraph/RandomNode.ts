/**
 * Random Node: You are implementing a binary tree class from scratch which,
 * in addition to insert, find, and delete, has a method getRandomNode()
 * which returns a random node from the tree. All nodes should be equally
 * likely to be chosen. Design and implement an algorithm for getRandomNode,
 * and explain how you would implement the rest of the methods.
 * 
 * assuming you can't delete node in the middle of the tree, you can only add
 * and remove on the last level at the right most available position then use
 * an array to implement this tree class:
 * parent node to children:
 *  parent node index * 2 then +1 for left +2 for right
 * children to parent node:
 *  (children index -1)/2 then floor it
 * getRandomNode would just get a random index by math.random * length
 */

