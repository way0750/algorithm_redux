const _ = require('lodash');
/**
 * Given the head to a singly linked list, where each node also has a “random” pointer that points to anywhere in the linked list, deep clone the list.
 */

/**
 * each node has a next and random pointer
 * if there is only a next pointer, that would a lot easier to deep clone the list, you don't have the next node yeah, but you can create
 * it and easily reference it
 * the tough part is having the random pointer pointing to specific node
 * 
 * one solution:
 * mutate the list node, add a new property call selfClone which is a deepClone of self
 * do the same thing node by node
 * then loop through the link list to add next and random pointers, once add, remove that property from original node
 * return the head node of the cloned list
 */


