/**
 * given a graph like this shape: 
 * {
 *   1: { visited: false, edges },
 *   2: { visited: false, edges }
 * }
 * 
 * do breadth first search
 * 
 * keep a stack: []
 * if search node by node:
 * then while loop when stack is not empty
 * each loop, like depth first search, mark the node as visited
 * then do what you have to do, call the callBack?
 * then add un-visited edge nodes to the stack 
 * 
 * if search by level by level
 * the stack will hold all the nodes from the same level now
 * while loop when stack is not empty
 * set newStack to empty array
 * as soon as entering while loop
 * loop through all nodes in the stack
 *   make each as visited, and call the callback with each
 *   and add univisted nodes to the empty array
 * replace the stack with array
 *   
 */

export function BFS_node_by_node(graph, startingNodeId, callBack) {
  graph[startingNodeId].visited = true;
  const stack = [startingNodeId];
  while(stack.length) {
    const nodeId = stack.shift();
    const node = graph[nodeId];
    callBack(nodeId);
    node.edges.forEach((linkedNodeId) => {
      if (!graph[linkedNodeId].visited) {
        graph[linkedNodeId].visited = true;
        stack.push(linkedNodeId);
      }
    });
  }
}

function BFS_level_by_level(graph, startingNodeId, callBack) {
  // make it as visited, that would mean that all of the nodes in the
  // stack are already visited, so later you should mark new nodes as visited
  // before putting them into the stack
  // also, it is a good idea to mark node as visited before putting it into the
  // stack. Not doing so would result in putting the same node (yet been marked
  // as visited) into the stack
  graph[startingNodeId].visited = true;
  let stack = [startingNodeId];
  while (stack.length) {
    const newStack = [];
    stack.forEach((nodeId) => {
      // make current node as visited
      const node = graph[nodeId];
      callBack(nodeId);

      node.edges.forEach((edgesId) => {
        const edgeNode = graph[edgesId];
        if (!edgeNode.visited) {
          edgeNode.visited = true;
          newStack.push(edgesId);
        }
      });
    });
    stack = newStack;
  }
}

describe('BFS', () => {
  describe('BFS node by node', () => { 

    it('test node by node 001', () => {
      const graph = {
        1: { edges: [2,3] },
        2: { edges: [4,5,1] },
        3: { edges: [6,7,2] },
        4: { edges: [6,7] },
        5: { edges: [8,9] },
        6: { edges: [8,9] },
        7: { edges: [9] },
        8: { edges: [1] },
        9: { edges: [4] }
      }
    const arr = [];
    BFS_node_by_node(graph, 1, (nodeId) => arr.push(nodeId))
    expect(arr).to.eql([1,2,3,4,5,6,7,8,9]);
    });
    it('test node by node 002', () => {
      const graph = {
        1: { edges: [2,3] },
        2: { edges: [4,1] },
        3: { edges: [7,2] },
        4: { edges: [7] },
        7: { edges: [9] },
        8: { edges: [1] },
        9: { edges: [4] }
      }
    const arr = [];
    BFS_node_by_node(graph, 1, (nodeId) => arr.push(nodeId))
    expect(arr).to.eql([1,2,3,4,7,9]);
    });
  });
  describe('BFS level by level', () => { 
    it('test level by level 001', () => {
      const graph = {
        1: { edges: [2,3] },
        2: { edges: [4,5,1] },
        3: { edges: [6,7,2] },
        4: { edges: [6,7] },
        5: { edges: [8,9] },
        6: { edges: [8,9] },
        7: { edges: [9] },
        8: { edges: [1] },
        9: { edges: [4] }
      }
    const arr = [];
    BFS_level_by_level(graph, 1, (nodeId) => arr.push(nodeId))
    expect(arr).to.eql([1,2,3,4,5,6,7,8,9]);
    });
    it('test level by level 002', () => {
      const graph = {
        1: { edges: [2,3] },
        2: { edges: [4,1] },
        3: { edges: [7,2] },
        4: { edges: [7] },
        7: { edges: [9] },
        8: { edges: [1] },
        9: { edges: [4] }
      }
    const arr = [];
    BFS_level_by_level(graph, 1, (nodeId) => arr.push(nodeId))
    expect(arr).to.eql([1,2,3,4,7,9]);
    });
  });
});