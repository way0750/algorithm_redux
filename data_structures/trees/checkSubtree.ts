/**
 * T l and T2 are two very large binary trees, with T l much bigger than T2. Create an
 * algorithm to determine if T2 is a subtree of Tl. A tree T2 is a subtree of T1 
 * if there exists a node n in T1 such that the subtree of n is identical to T2.
 * That is, if you cut off the tree at node n, the two trees would be identical.
 * 
 * solution 1:
 * make two functions:
 * 1 is the main one that search for a node in T1 that is same value as the top tree
 * of T2
 * once a value is found, then call 2nd function with both of that node, and T2
 * top node
 * 
 * function 1:
 * just a depth first search function
 * keep checking node by node to see if it is the same by value as T2
 * when it is
 * call the function 2
 * if function 2 return true, stop call and return true
 * else keep calling until function 2 returns true or default to return false
 * 
 * function 2: takes two nodes: node1 and node2
 * base case: one of the nodes is null
 *   compare both nodes: both null? return true else return false
 * what to always return: boolean
 * what to do with returns? if both returns true, returns true else false
 * how to make problem smaller: recursively node1 and node2 left, then both
 * their right
 * 
 * time and space:
 * time: N is T1 node amount, M is T2 node amount
 * worst case you would have to go through entire T1, and for each node you have
 * to compare with T2, so worst case it would be N*M
 * 
 * space: depth search T1, so space for that would logN
 * depth search T2, so space fot that would logM
 * logN + logM
 */
