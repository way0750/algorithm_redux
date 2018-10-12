// Given two singly linked lists that intersect at some point, find the intersecting node. The lists are non-cyclical.

// For example, given A = 3 -> 7 -> 8 -> 10 and B = 99 -> 1 -> 8 -> 10, return the node with value 8.

// In this example, assume nodes with the same value are the exact same node objects.

// Do this in O(M + N) time (where M and N are the lengths of the lists) and constant space.

/**
 * You can mutate the data structure and adding something like visited to each node in the first link list
 * then loop through the second one and see if any node has already been visited, if yes, then return true
 * 
 * But mutating input is bad, so another way to do it is comparing nodes from two lists see if that they are
 * the same node.
 * But the lists can be of different lengths, so have two pointers to pick nodes, but move the pointers
 * from the longer one forward first until both pointers are the same distance to their respective end
 */

