/**
 * give a binary tree consisted of nodes that have only either 1 or 0 as value
 * trim the tree of any sub tree that is consisted of only 0s.
 *      0
 *     / \
 *    1   0
 *       /  \
 *       1   0
 *      /\
 *     0  0
 * 
 * the tree should be trimmed into:
 *      0
 *     / \
 *    1   0
 *       /
 *       1
 * 
 * 
 * use recursion to check if sub tree is all 0s
 * 
 * base case
 *    if no child at all 
 *      if self value is 1 return return self
 *    else self value would only be 0, that means this sub tree (with only 1
 *    node, which is self node), is all 0, return null
 * 
 * what to do with return?????
 *   meaning the left/right child has return itself, no need to do anything
 *   because that node still the child node
 *   if return is null, remove that child
 * 
 * what to always return:
 *    always return object: node / null
 * 
 * how to make problem "smaller"/recursively call?
 *   just call left and right child...
 * 
 */