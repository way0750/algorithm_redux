import { GraphNode, Graph } from "./graph/graph";

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

const A = 'A';
const B = 'B';

export function routeBetweenNodesDirected(graph: Graph, node1, node2) {
  let ANodes: Array<GraphNode> = [node1];
  while (ANodes.length) {
    const AAdjacent: Array<GraphNode> = [];
    for (let AIndex = 0; AIndex < ANodes.length; AIndex++) {
      const node = ANodes[AIndex];
      if (node === node2) {
        return true;
      } else {
        node.hasBeenVisited = true;
        let adjNodes = node.edges.map((edgeNodeId) => graph.getNode(edgeNodeId));
        AAdjacent.push(...adjNodes);
      }
    }
    ANodes = AAdjacent;
  }

  return false;
}
export function routeBetweenNodes(graph: Graph, node1, node2) {
  let ANodes: Array<GraphNode> = [node1];
  let BNodes: Array<GraphNode> = [node2];
  while (ANodes.length && BNodes.length) {
    const AAdjacent: Array<GraphNode> = [];
    const BAdjacent: Array<GraphNode> = [];
    for (let AIndex = 0; AIndex < ANodes.length; AIndex++) {
      const node = ANodes[AIndex];
      if(node.hasBeenVisited === B) {
        return true;
      } else if (!node.hasBeenVisited) {
        node.hasBeenVisited = A;
        let adjNodes = node.edges.map((edgeNodeId) => graph.getNode(edgeNodeId));
        adjNodes = adjNodes.filter((node) => node.hasBeenVisited !== A);
        AAdjacent.push(...adjNodes);
      }
    }
    ANodes = AAdjacent;

    for (let BIndex = 0; BIndex < ANodes.length; BIndex++) {
      const node = ANodes[BIndex];
      if(node.hasBeenVisited === A) {
        return true;
      } else if (!node.hasBeenVisited) {
        node.hasBeenVisited = B;
        let adjNodes = node.edges.map((edgeNodeId) => graph.getNode(edgeNodeId));
        adjNodes = adjNodes.filter((node) => node.hasBeenVisited !== B);
        BAdjacent.push(...adjNodes);
      }
    }
    BNodes = BAdjacent;
  }

  return false;
}

describe('Route Between Nodes in directed graph', () => {
  let graph;
  beforeEach(() => {
    graph = new Graph(false);
    graph.addNode(0);
    graph.addNode(1);
    graph.addNode(2);
    graph.addNode(3);
    graph.addNode(4);
    graph.addNode(5);
    graph.addNode(6);
    graph.addNode(7);
    graph.addNode(8);
    graph.addNode(9);
    graph.addNode(10);
    graph.addNode(11);
    graph.addNode(12);
    graph.addNode(13);
    graph.addNode(14);
    graph.addNode(15);
    graph.addNode(16);
    graph.addNode(17);
    graph.addNode(18);
    graph.addNode(19);
    graph.addNode(20);
    graph.addNode(21);
    graph.addNode(22);
    graph.addNode(23);
    graph.addNode(24);
    graph.addNode(25);
    graph.addNode(26);
    graph.addNode(27);
    graph.addNode(28);
    graph.addNode(29);
    graph.addNode(30);
    graph.addNode(31);
    graph.addNode(32);
    graph.addNode(33);
    graph.addNode(34);
    graph.addNode(35);
    graph.addNode(36);
    graph.addNode(37);
    graph.addNode(38);
    graph.addNode(39);
    graph.addNode(40);
    graph.addNode(41);
    graph.addNode(42);
    graph.addNode(43);
    graph.addNode(44);
    graph.addNode(45);
    graph.addNode(46);
    graph.addNode(47);
    graph.addNode(48);
    graph.addNode(49); 

    graph.linkNodes({ targetId: 1, edges: [2,3,4,5,6,7,8]} );
    graph.linkNodes({ targetId: 2, edges: [10,11]} );
    graph.linkNodes({ targetId: 3, edges: [12,13]} );
    graph.linkNodes({ targetId: 4, edges: [13,14]} );
    graph.linkNodes({ targetId: 5, edges: [15,16,17]} );
    graph.linkNodes({ targetId: 6, edges: [18]} );
    graph.linkNodes({ targetId: 7, edges: [19,20,21]} );
    graph.linkNodes({ targetId: 8, edges: [9,10]} );
    graph.linkNodes({ targetId: 9, edges: [23]} );
    graph.linkNodes({ targetId: 10, edges: [24]} );
    graph.linkNodes({ targetId: 11, edges: [25,26,27]} );
    graph.linkNodes({ targetId: 12, edges: [28,29]} );
    graph.linkNodes({ targetId: 13, edges: [30,31]} );
    graph.linkNodes({ targetId: 14, edges: [32]} );
    graph.linkNodes({ targetId: 15, edges: [33,34,35]} );
    graph.linkNodes({ targetId: 16, edges: [35]} );
    graph.linkNodes({ targetId: 17, edges: [36,37]} );
    graph.linkNodes({ targetId: 18, edges: [38]} );
    graph.linkNodes({ targetId: 19, edges: [39]} );
    graph.linkNodes({ targetId: 20, edges: [40]} );
    graph.linkNodes({ targetId: 21, edges: [22,41,42]} );
  });
  it('should return true', () => {
    expect(routeBetweenNodes(graph, graph.getNode(1), graph.getNode(32))).to.be.true;
  });
  it('should return false', () => {
    expect(routeBetweenNodes(graph, graph.getNode(0), graph.getNode(32))).to.be.false;
  });
});

describe('Route Between Nodes', () => {
  let graph;
  beforeEach(() => {
    graph = new Graph(true);
    graph.addNode(0);
    graph.addNode(1);
    graph.addNode(2);
    graph.addNode(3);
    graph.addNode(4);
    graph.addNode(5);
    graph.addNode(6);
    graph.addNode(7);
    graph.addNode(8);
    graph.addNode(9);
    graph.addNode(10);
    graph.addNode(11);
    graph.addNode(12);
    graph.addNode(13);
    graph.addNode(14);
    graph.addNode(15);
    graph.addNode(16);
    graph.addNode(17);
    graph.addNode(18);
    graph.addNode(19);
    graph.addNode(20);
    graph.addNode(21);
    graph.addNode(22);
    graph.addNode(23);
    graph.addNode(24);
    graph.addNode(25);
    graph.addNode(26);
    graph.addNode(27);
    graph.addNode(28);
    graph.addNode(29);
    graph.addNode(30);
    graph.addNode(31);
    graph.addNode(32);
    graph.addNode(33);
    graph.addNode(34);
    graph.addNode(35);
    graph.addNode(36);
    graph.addNode(37);
    graph.addNode(38);
    graph.addNode(39);
    graph.addNode(40);
    graph.addNode(41);
    graph.addNode(42);
    graph.addNode(43);
    graph.addNode(44);
    graph.addNode(45);
    graph.addNode(46);
    graph.addNode(47);
    graph.addNode(48);
    graph.addNode(49); 

    graph.linkNodes({ targetId: 1, edges: [2,3,4,5,6,7,8]} );
    graph.linkNodes({ targetId: 2, edges: [10,11]} );
    graph.linkNodes({ targetId: 3, edges: [12,13]} );
    graph.linkNodes({ targetId: 4, edges: [13,14]} );
    graph.linkNodes({ targetId: 5, edges: [15,16,17]} );
    graph.linkNodes({ targetId: 6, edges: [18]} );
    graph.linkNodes({ targetId: 7, edges: [19,20,21]} );
    graph.linkNodes({ targetId: 8, edges: [9,10]} );
    graph.linkNodes({ targetId: 9, edges: [23]} );
    graph.linkNodes({ targetId: 10, edges: [24]} );
    graph.linkNodes({ targetId: 11, edges: [25,26,27]} );
    graph.linkNodes({ targetId: 12, edges: [28,29]} );
    graph.linkNodes({ targetId: 13, edges: [30,31]} );
    graph.linkNodes({ targetId: 14, edges: [32]} );
    graph.linkNodes({ targetId: 15, edges: [33,34,35]} );
    graph.linkNodes({ targetId: 16, edges: [35]} );
    graph.linkNodes({ targetId: 17, edges: [36,37]} );
    graph.linkNodes({ targetId: 18, edges: [38]} );
    graph.linkNodes({ targetId: 19, edges: [39]} );
    graph.linkNodes({ targetId: 20, edges: [40]} );
    graph.linkNodes({ targetId: 21, edges: [22,41,42]} );
  });
  it('should return true', () => {
    expect(routeBetweenNodes(graph, graph.getNode(1), graph.getNode(32))).to.be.true;
  });
  it('should return false', () => {
    expect(routeBetweenNodes(graph, graph.getNode(0), graph.getNode(32))).to.be.false;
  });
});