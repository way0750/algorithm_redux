/**
 * Problem: Find the shortest path in a weighted graph from a given source to a destination.
 * Details: Given a graph with edges that each have a weight (positive integers only),
 * you have to find the shortest path (with the least total weight) from a given source
 * node to a destination node. Assume that the graph is represented as an adjacency matrix,
 * and each cell in the matrix represents the weight of the edge between two nodes
 * (with 0 indicating no edge). Also, assume that all edge weights are positive integers,
 * and the graph may contain cycles. Implement a function that finds the shortest path
 * from a given source node to a destination node.
 * 
 * 
 * just use breadth first search to find paths to the destination
 * but make sure to pass along the weight of the edge
 * should just short cut return when there is a curMinPath, and the whichever path that is still
 * searching is getting longer than that
 * 
 * return an array that's the path
 */

export function getShortestPath (matrix, from, to) {
    const curLevel = [{ nodeId: from, curPathWeight: 0, path: [from]}];
    let curMinWeight = Infinity; // only update this when reaching the to;
    while (curLevel.length) {

    }
}