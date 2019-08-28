/**
 * implement graph again
 * going to use a hash as storage
 * nodes: {
 *   id: { edges: [ other ids ]}
 * }
 */

export class Graph {
  private nodes = {};
  breadthFirstSearch(startId, target) {
    /**
     * basic idea initialize a queue and push 1 node in it. make sure to make it
     * as visited first, all node that are pushed in the queue should be marked
     * as visited to prevent double pushing
     */
    this.nodes[startId].visited = true;
    const nodeIds = [startId];
    while(nodeIds.length) {
      // shift one out
      // check if it === target 
      // if yes then return
      const nodeId = nodeIds.shift();
      if (nodeId === target) {
        return true;
      }
      // then check all edges, for the ones that are
      // visited===false, make them true, and then push into queue
      const edges = this.nodes[nodeId].edges;
      edges.forEach((edgeId) => {
        if (!this.nodes[edgeId].visited) {
          this.nodes[edgeId].visited = true;
          nodeIds.push(edgeId);
        }
      });
    }

    return false;
  }

  breadthFirstSearchWithFragmentedGraph(target) {
    /**
     * in case tree is fragmented, we should go through the this.nodes
     * and for each node, if it has yet been visited, then perform BFS on it
     */
    for (let nodeId in this.nodes) {
      if (+nodeId === target) {
        return true;
      }
      if (!this.nodes[nodeId].visited) {
        if (this.breadthFirstSearch(nodeId, target)) {
          return true;
        }
      }
    }

    return false;
  }

  biDirectionalSearch(a, b) {
    /**
     * this is the same as the basic BFS, but here we will have two
     * points, so instead of initializing one queue
     * you should have 2
     * and when comes to marking the visited value, add the starting id to tell
     * who visited the node
     * and when checking if a node has been visited, make sure to check if it
     * has been visited by the same node id
     */

     if(!this.nodes[a] || !this.nodes[b]) {
       return false;
     } else if (a===b) {
       return true;
     }
     const ANodes = [a];
     const BNodes = [b];
     while(ANodes.length && BNodes.length) {
       const AResult = this.searchOneBreadth(ANodes, 'a', 'b');
       const BResult = this.searchOneBreadth(BNodes, 'b', 'a');
       if (AResult || BResult) {
         return true;
       }
     }

     return false;
  }

  private searchOneBreadth(queue, source, target) {
    const nodeId = queue.shift();
    if (this.nodes[nodeId].visited === target) {
      return true;
    }

    this.nodes[nodeId].visited = source;
    const edges = this.nodes[nodeId].edges;
    edges.forEach((nodeId) => {
      if (this.nodes[nodeId].visited !== source) {
        this.nodes[nodeId].visited = source;
        queue.push(nodeId);
      }
    });
    return false;
  }
}

describe('Testing graph 2', () => {
  it('001, should return true', () => {
    const graph = new Graph();
    const nodes = {
      1: { edges: [2,3,4,6]},
      2: { edges: [3,4,5]},
      3: { edges: [4]},
      4: { edges: [5,1,2]},
      5: { edges: [2,3]},
      6: { edges: [5,4,7]},
      7: { edges: [6]},
    };
    Object.assign((graph as any).nodes, nodes);
    expect(graph.breadthFirstSearch(1, 7)).to.be.true;
  });
  it('002, should return false', () => {
    const graph = new Graph();
    const nodes = {
      1: { edges: [2,3,4]},
      2: { edges: [3,4,5]},
      3: { edges: [4,6]},
      4: { edges: [5,1,2]},
      5: { edges: [6,2,3]},
      6: { edges: [5,4,7]},
      7: { edges: []},
    };
    Object.assign((graph as any).nodes, nodes);
    expect(graph.breadthFirstSearch(1, 8)).to.be.false;
  });
  it('003, should return true', () => {
    const graph = new Graph();
    const nodes = {
      1: { edges: [2,3,4]},
      2: { edges: [3,4,5]},
      3: { edges: [4,6]},
      4: { edges: [5,1,2]},
      5: { edges: [6,2,3]},
      6: { edges: [5,4]},
      7: { edges: []},
      8: { edges: []},
      9: { edges: []},
      10: { edges: []}
    };
    Object.assign((graph as any).nodes, nodes);
    expect(graph.breadthFirstSearchWithFragmentedGraph(10)).to.be.true;
    expect(graph.breadthFirstSearchWithFragmentedGraph(11)).to.be.false;
  });
  it('004, should return true', () => {
    const graph = new Graph();
    const nodes = {
      1: { edges: [2,3,4]},
      2: { edges: [3,4,5]},
      3: { edges: [4,6]},
      4: { edges: [5,1,2]},
      5: { edges: [2,3]},
      6: { edges: [5,4,7]},
      7: { edges: [6,8]},
      8: { edges: [7,9]},
      9: { edges: [8,10]},
      10: { edges: [9]}
    };
    Object.assign((graph as any).nodes, nodes);
    expect(graph.biDirectionalSearch(1,10)).to.be.true;
  });
  it('005, should return false because graph is fragmented', () => {
    const graph = new Graph();
    const nodes = {
      1: { edges: [2,3,4]},
      2: { edges: [3,4,5]},
      3: { edges: [4,6]},
      4: { edges: [5,1,2]},
      5: { edges: [2,3]},
      6: { edges: [5,4,7]},
      7: { edges: [6,8]},
      8: { edges: []},
      9: { edges: [8,10]},
      10: { edges: [9]}
    };
    Object.assign((graph as any).nodes, nodes);
    expect(graph.biDirectionalSearch(1,10)).to.be.false;
  });
});