// the problem is from here:
// https://www.popsci.com/worlds-hardest-maze

/**
 * Essentially this is a graph traversal problem
 * 
 * constrains:
 * you must traverse in this order: red green blue
 * you can not go through the same node twice in a row
 * you have to go from r3_1 to r5_5
 * see the graph in the same dir
 * 
 * solution make one directional graph with nodes in the picture
 * set r3_1 as the starting node and the goal is to traverse from r3_1 to r5_5
 * set path to an array, we will put nodes that we have traversed through in it
 *   and can use it to see if we are about to go through a node twice in a row
 *   and we can use it to find all paths and then get the shortest one
 */
