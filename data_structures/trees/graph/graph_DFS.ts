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


// export function DFS(graph, node, callBack) {
//   if (graph[node].visited) {
//     return;
//   }

//   graph[node].visited = true;
//   callBack(node);
//   graph[node].edges.forEach((v) => {
//     DFS(graph, v, callBack);
//   });
// }

/**
 * depth first... basically always check children before siblings
 * // visit one node, mark it as visited to prevent revisit
 * base case: no node left at the depth, or node has been visited
 */

export function DFS(graph, startingNode: number, callBack) {
  const node = graph[startingNode];
  if (node.visited) {
    return;
  }
  node.visited = true;
  callBack(startingNode);

  // go through other nodes
  node.edges.forEach((linkNode: number) => {
    DFS(graph, linkNode, callBack);
  });
}

function DFSForDisconnectedGraph(graph, callBack) {
  for( let node in graph ) {
    DFS(graph, +node, callBack);
  }
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
      1: { edges: [7, 2, 4, 5], visited: false},
      2: { edges: [3, 4, 5, 1], visited: false},
      3: { edges: [4, 6], visited: false},
      4: { edges: [5, 1], visited: false},
      5: { edges: [6, 1], visited: false},
      6: { edges: [], visited: false},
      7: { edges: [1], visited: false}
    };

    const nums = [1,7,2,3,4,5,6];
    const result = [];
    DFS(graph, 1, (n) => result.push(n))
    expect(result).to.eql(nums);
  });

  it('should work with a disconnected graph', () => {
    const graph = {
      0: { edges: [], visited: false},
      1: { edges: [2, 4, 5], visited: false},
      2: { edges: [3, 4, 5, 1], visited: false},
      3: { edges: [4, 6], visited: false},
      4: { edges: [5, 1], visited: false},
      5: { edges: [6, 1], visited: false},
      6: { edges: [], visited: false},
      7: { edges: [8], visited: false},
      8: { edges: [9], visited: false},
      9: { edges: [], visited: false}
    };

    const nums = [0,1,2,3,4,5,6,7,8,9];
    const result = [];
    DFSForDisconnectedGraph(graph, (n) => result.push(n))
    expect(result).to.eql(nums);
  });
});