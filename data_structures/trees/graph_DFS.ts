/**
 * depth first search on graph
 * 
 * if using recursion:
 * base case: node has been visited
 * how to make problem smaller: go through each edges, if there isn't any
 *   that's essentially another base case
 * what to do with return: nothing
 * what to always return: nothing
 * 
 * 
 * shape of graph: {
 *   num: {[edges], visited}
 * 
 * }
 */


export function DFS(graph, node, callBack) {
  if (graph[node].visited) {
    return;
  }

  graph[node].visited = true;
  callBack(node);
  graph[node].edges.forEach((v) => {
    DFS(graph, v, callBack);
  });
}

function DFSForDisconnectedGraph(graph, node, callBack) {

}

describe('DFS for graph', () => {
  it('should return 1,2,3,4', () => {
    const graph = {
      1: { edges: [2, 4, 5], visited: false},
      2: { edges: [3, 4, 5, 1], visited: false},
      3: { edges: [4, 6], visited: false},
      4: { edges: [5, 1], visited: false},
      5: { edges: [6, 1], visited: false},
      6: { edges: [], visited: false},
    };

    const nums = [1,2,3,4,5,6];
    const result = []
    DFS(graph, 1, (n) => result.push(n))
    expect(result).to.eql(nums);
  });
  it('should return 1,2,3,4', () => {
    const graph = {
      1: { edges: [2, 4, 5], visited: false},
      2: { edges: [3, 4, 5, 1], visited: false},
      3: { edges: [4, 6], visited: false},
      4: { edges: [5, 1], visited: false},
      5: { edges: [6, 1], visited: false},
      6: { edges: [], visited: false},
    };

    const nums = [1,2,3,4,5,6];
    const result = [];
    DFS(graph, 1, (n) => result.push(n))
    expect(result).to.eql(nums);
  });
});