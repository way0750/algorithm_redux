/**
 * Given a graph, and two nodes, find if there is a route between them
 * 
 * bi directional search with breadth first: one node mark and then search all
 * the connected nodes, once done then search all the connected nodes from each
 * of those nodes
 * 
 * should mark nodes different depending on the origin node: visited: 'A' vs
 * visited: 'B'
 * 
 * time and space:
 * if the shortest distance between those two nodes is k, then you will loop k/2
 * time, so time will be k/2 which is k
 * 
 * space: worst case you end up going through all the nodes....
 * 
 * solution 1:
 * set ANodes = [node1] BNodes[node2]
 * while (both ANodes and BNodes are not empty)
 *   keep looping
 *   set AChildren and BChildren to []
 *   go through each nodes in ANodes
 *     already marked by 'A' forget about it
 *     already marked by 'B' return true, B has been here so there is a path
 *     not marked in anyway? mark for 'A' and add
 *     all child to AChildren
 *   once done replace ANodes with AChildren
 *   then do the same with BNodes
 */