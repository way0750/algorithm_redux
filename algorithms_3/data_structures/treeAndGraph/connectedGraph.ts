/**
 * Problem Statement:

You are given an undirected graph represented as an adjacency matrix, where graph[i][j] = 1
represents a direct edge between i and j (the graph is undirected, so graph[j][i] = 1 is also true),
and graph[i][j] = 0 represents no direct edge between i and j.

Write a function to check whether it's possible to travel from every node to every other node.

The graph has at most 100 nodes.

For example:

javascript

Input: [[1,1,0], [1,1,0], [0,0,1]]
Output: false
Explanation: It's not possible to travel from node 0 or 1 to node 2.

Input: [[1,1,0], [1,1,1], [0,1,1]]
Output: true
Explanation: It's possible to travel between all nodes.

Your task is to write a function:

function canTravelToEveryNode(graph) {
    // Your code here
}

Note:
The graph is undirected, meaning that if a node j is reachable from node i, then node i is
also reachable from node j. This property can simplify the problem because it's only
necessary to check reachability from one node to all other nodes.


basically you just need to check if all nodes are connected in one graph.
just visit all the connected nodes and then add to a hash for being visited
then compare the actual amount of nodes in graph vs the nodes that have been visited
 */

export function canTravelToEveryNode (matrix) {
    if (!matrix.length) return true;
    const visited = { 0: true };
    let queue = [0]; // using index of node in matrix as the actual node itself
    let firstGraphSize = 1;
    while (queue.length) {
        const newQueue = [];
        queue.forEach((nodeVal) => {
            const row = matrix[nodeVal];
            row.forEach((isConnected, edgeNodeVal) => {
                if (isConnected && !visited[edgeNodeVal]) {
                    visited[edgeNodeVal] = true;
                    firstGraphSize++;
                    newQueue.push(edgeNodeVal);
                }
            });
        });
        queue = newQueue;
    }

    return firstGraphSize === matrix.length;
}

describe('is connected graph', () => {
    it('should return true for empty matrix', () => {
        const matrix = [];
        expect(canTravelToEveryNode(matrix)).to.equal(true);
    });
    it('should return true for connected', () => {
        const matrix = [[1,1,0], [1,1,1], [0,1,1]];
        expect(canTravelToEveryNode(matrix)).to.equal(true);
    });
    it('should return false for having more than 1 partition in graph', () => {
        const matrix = [[1,1,0], [1,1,0], [0,0,1]];
        expect(canTravelToEveryNode(matrix)).to.equal(false);
    });
});

