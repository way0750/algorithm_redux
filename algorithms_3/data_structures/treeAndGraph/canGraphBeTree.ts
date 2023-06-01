/**
 * Problem Statement:
You're given a list of edges representing an undirected graph, and an integer n representing the number of nodes in the graph (numbered from 0 to n-1). Your task is to determine whether the graph can be represented as a tree.

A graph is a tree if it's a fully connected, acyclic graph.

Example:

Input: 
edges = [[0, 1], [0, 2], [0, 3], [1, 4]], 
n = 5

Output: 
true

Explanation:
The graph can be represented as a tree with 0 as the root node, 1, 2, 3 as its children, and 4 as child of 1.

Additional Notes:

    The edges are given in an array of arrays, where each subarray contains two integers representing the nodes connected by the edge.
    You may assume that there are no duplicate edges in the input, and no self-loops.
    If there are no edges, and n is 1, return true as it forms a single-node tree. If n is more than 1, return false as it is not a fully connected graph.
    Nodes are numbered from 0 to n-1.

    to know if a graph is a tree:
    all the nodes need to be connected
    there has to be exactly one node that no nodes connected to, it would be the root node

    solution:
    go through each edges
    add both nodes to a hash:
    {
        0: 1 // 1 means this node exists
        1: 2 // 2 means this node has a parent, if it is more than 2 then that means multiple nodes
            are connected to the same node which would faile the tree test. Also, it would also potentially
            means there might be a cycle
    }
 */

export function isGraphConvertableToTree(edges, n) {
    const nodeHash = {};
    for (let i = 0; i < edges.length; i++) {
        const [parent, child] = edges[i];
        // bring nodes into existence:
        nodeHash[parent] = nodeHash[parent] || 1;
        nodeHash[child] = nodeHash[child] || 1;
        nodeHash[child]++
        if (nodeHash[child] > 2) {
            return false;
        }
    }
    const nodeKeys = Object.keys(nodeHash);
    const rootNodes = nodeKeys.filter((nodeKey) => {
        return nodeHash[nodeKey] === 1;
    });

    return rootNodes.length === 1 && nodeKeys.length === n;
}

describe('can graph be tree', () => {
    it('should return true', () => {
        const edges = [[1, 2], [2, 3], [4, 0]];
        const n = 4;
        expect(isGraphConvertableToTree(edges, n)).to.equal(false);
    });
});