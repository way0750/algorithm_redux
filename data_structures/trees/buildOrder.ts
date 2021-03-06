import { Graph, GraphNode } from "./graph";

/**
 * You are given a list of projects and a list of dependencies
 * (which is a list of pairs of projects, where the second project is dependent on
 * the first project). All of a project's dependencies must be built before the
 * project is. Find a build order that will allow the projects to be built.
 * If there is no valid build order, return an error.
 * EXAMPLE Input:
 * projects: a, b, c, d, e, f
 * dependencies: (a, d), (f, b), (b, d), (f, a), (d, c) Output: f, e, a, b, d, c
 * 
 * well use a directed graph to map over all of these dependencies
 * then recursively go through the graph to return a build order
 * 
 * solution 1:
 * assuming the vertices and edges are given like this: 
 * 1, 2, 3
 * [[1,2], [1,3]]
 * 2 and 3 have to be done before 1
 * 
 * go through the vertices list to add them to a directed graph, undirected
 * graph doesn't really show the idea of dependencies
 * the go through the edges to connect those vertices
 * 
 * go through each node in the graph
 * if the node has yet been visited, then call it with a recursive search function
 * 
 * the recursive search function:
 * go through each edge and recursive call each edge node if it's not visited
 * and add the push the flatten return to a main array
 * then at the very end push current node value to that main array
 * 
 * so recursive case: edge node has yet been visited
 * what to always return an array of values
 * what to do with returned arrays: flatten them and push them into a main array
 *   eventually return that
 * how to make problem smaller: recursively call the edges
 * 
 * time and space:
 * time:
 *   go through each node
 *   recursively search through each un-visited node
 *   so N (N is the amount of node)
 * space:
 *   the recursion: worst case the graph is a linklist, so N
 *   the amount of nodes in the final build order: N
 *   so N
 */

function search(graph: Graph, graphNode: GraphNode): Array<any> {
  const buildOrder = [];
  graphNode.hasBeenVisited = true;
  graphNode.cacheArray = [];
  graphNode.edges.forEach((edgeNodeId) => {
    const edgeNode = graph.getNode(edgeNodeId);
    if (!edgeNode.hasBeenVisited){
      const subBuildOrder: Array<any> = search(graph, edgeNode);
      buildOrder.push(...subBuildOrder);
    } else if (edgeNode.cacheArray.length) {
      // pick up existing sub build order created previously
      buildOrder.push(...edgeNode.cacheArray);
      edgeNode.cacheArray = [];
    }
  });
  buildOrder.push(graphNode.value);
  return buildOrder;
}

export function makeBuildOrder(vertices: Array<any>, dependencies: Array<Array<any>>) {
  const graph = new Graph();
  vertices.forEach((newNodeId) => graph.addNode(newNodeId));
  dependencies.forEach(([targetId, connectedTo]) => graph.linkNodes({ targetId, edges: [connectedTo]}));
  
  const finalBuildOrder = [];
  graph.forEach((node: GraphNode) => {
    if (!node.hasBeenVisited) {
      const subBuildOrder = search(graph, node);
      node.cacheArray = subBuildOrder;
    }
  });

  // make sure to revert the flag
  graph.forEach((node: GraphNode) => {
    finalBuildOrder.push(...node.cacheArray);
    node.hasBeenVisited = false
    node.cacheArray = [];
  });

  return finalBuildOrder;
}

describe('Build Order', () => {
  it('Should return empty array for empty graph', () => {
    const vertices = [];
    const edges = [];
    expect(makeBuildOrder(vertices, edges)).to.eql([]);
  });
  it('Should return correct order for the example', () => {
    //                 0    1    2    3    4    5
    const vertices = ['a', 'b', 'c', 'd', 'e', 'f'];
    const edges = [[3, 0], [1, 5], [3, 1], [0, 5], [2, 3]];
    expect(makeBuildOrder(vertices, edges)).to.eql([ 'f', 'a', 'b', 'd', 'c', 'e' ]);
  });

  it('Should return correct order for a graph that is made of all isolated nodes', () => {
    //                 0    1    2    3    4    5
    const vertices = ['a', 'b', 'c', 'd', 'e', 'f'];
    const edges = [];
    expect(makeBuildOrder(vertices, edges)).to.eql(vertices);
  });
});