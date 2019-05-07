/**
 * Intersection: Given two (singly) linked lists, determine if the two lists intersect.
 * Return the intersecting node. Note that the intersection is defined based on
 * reference, not value. That is, if the kth node of the first linked list is the
 * exact same node (by reference) as the jth node of the second linked list, then they are intersecting.
 * 
 * solution 1:
 * well loop through both list and mutate all the node to have a checked state
 * whenever a node already has a checked state then they intersect and return true
 * else return false
 * 
 * time and space:
 * time you would have to go through the longest list
 * space you are adding new property to all the node worse
 * case it longest list * 2
 */