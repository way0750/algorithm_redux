/**
 * Graph
 * Just a tree that has cycle...
 * But what if in a graph there are multiple disconnected graphs?
 * well create a containing class for those disconnected graphs
 * just so you can maintain the idea that a graph has all the nodes connected
 * and if any nodes are not connected, then they should be in different graph
 * 
 * Attr:
 * for each node object
 * nodeId: just in case you can't just use value as id, or values are repeated
 * value: the actual value
 * hasBeenVisited: good for looping
 * 
 * the class itself should have a storage of all the nodes, and list of edges
 * methods:
 * forEach: to loop through each node
 *
 * 
 */

export class GraphNode {
  public value: any;
  public nodeId: number;
  public hasBeenVisited: Boolean | String = false;
  public edges: Array<number> = [];
  constructor({ id, value, edges }: { id: number, value: any, edges?: Array<number>}){
    this.nodeId = id;
    this.value = value;
    this.edges = edges || this.edges;
  }
}

export class Graph {
  private nodes: { [key: string]: GraphNode } = {};
  private newNodeId: number = 0;
  private biDirection: Boolean = false;

  constructor(biDirection = false) {
    this.biDirection = biDirection;
  }

  public getNode(nodeId) {
    return this.nodes[nodeId];
  }

  public addNode(value: any, edges: Array<number> = []) {
    const newNode = new GraphNode({ id: this.newNodeId, value });
    this.nodes[this.newNodeId] = newNode;
    this.linkNodes({ targetId: this.newNodeId, edges });
    this.newNodeId++;
  }

  public linkNodes({ targetId, edges }) {
    const validEdges = this.addEdges({ targetId, edges });
    if(this.biDirection) {
      validEdges.forEach((nodeId) => {
        this.addEdges({ targetId: nodeId, edges: [ targetId ]});
      });
    }

    return validEdges;
  }

  /**
   * get all the valid properties for each node, then return them in an array
   */
  public toArray(properties = ['nodeId']) {
    const allIds = Object.keys(this.nodes);
    return allIds.map((id: string) => {
      // get all the valid properties for each node
      return properties.reduce((obj, property) => {
        const node = this.nodes[id];
        if (node && node.hasOwnProperty(property)) {
          obj[property] = node[property];
        }
        return obj;
      }, {});
    });
  }

  public search(callBack) {
    let nodeIds: Array<string> = Object.keys(this.nodes);
    let found = false;
    while(nodeIds.length && !found) {
      const nodeId = nodeIds.shift();
      const node = this.nodes[nodeId];
      if (!node.hasBeenVisited) {
        const cbResult = callBack(node, this);
        node.hasBeenVisited = true;
        if (cbResult) {
          found = true;
        } else {
          const edges = node.edges.map((edge) => `${edge}`);
          nodeIds.unshift(...edges);
        }
      }
    }

    nodeIds = Object.keys(this.nodes);
    nodeIds.forEach((id) => this.nodes[id].hasBeenVisited = false);
  }

  public forEach(callBack) {
    this.search((node, graph) => {
      callBack(node, graph);
      // make sure all nodes have been gone through;
      return false;
    });
  }

  private addEdges({ targetId, edges }: { targetId: number, edges: Array<number>}): Array<number> {
    const node = this.nodes[targetId];
    if (!node) {
      return [];
    }
    const edgesRecord: {[key: number]: Boolean} = {}
    const validEdges = [...node.edges, ...edges].filter((edgeNodeId) => {
      const nodeIdKey = `${edgeNodeId}`;
      if (!edgesRecord[nodeIdKey] && this.nodes[nodeIdKey] && edgeNodeId !== targetId) {
        edgesRecord[nodeIdKey] = true;
        return true;
      } else {
        return false;
      }
    });

    node.edges = validEdges;

    return validEdges;
  }
}

describe('Graph Class', () => {
  it('should initialize directed graph', () => {
    const graph = new Graph(false);
    for (let value = 0; value < 5; value++) {
      graph.addNode(value);
    }

    graph.linkNodes({ targetId: 0, edges: [0,2,3] });
    graph.linkNodes({ targetId: 0, edges: [0,2,3] });
    graph.linkNodes({ targetId: 0, edges: [0,2,3] });
    expect((graph as any).nodes[0].edges).to.eql([2,3]);
    expect((graph as any).nodes[2].edges).to.eql([]);
    expect((graph as any).nodes[3].edges).to.eql([]);

    graph.linkNodes({ targetId: 2, edges: [2,2,2,2,23,3] });
    expect((graph as any).nodes[2].edges).to.eql([3]);
    expect((graph as any).nodes[3].edges).to.eql([]);
  });

  it('should initialize undirected graph', () => {
    const graph = new Graph(true);
    for (let value = 0; value < 5; value++) {
      graph.addNode(value);
    }

    graph.linkNodes({ targetId: 0, edges: [0,2,3] });
    graph.linkNodes({ targetId: 0, edges: [0,2,3] });
    graph.linkNodes({ targetId: 0, edges: [0,2,3] });
    expect((graph as any).nodes[0].edges).to.eql([2,3]);
    expect((graph as any).nodes[2].edges).to.eql([0]);
    expect((graph as any).nodes[3].edges).to.eql([0]);

    graph.linkNodes({ targetId: 2, edges: [2,2,2,2,23,3] });
    expect((graph as any).nodes[3].edges).to.eql([0, 2]);
  });

  it('should loop through graph', () => {
    const graph = new Graph(true);
    for (let value = 0; value < 10; value++) {
      graph.addNode(value);
    }

    graph.linkNodes({ targetId: 0, edges: [2,3] });
    graph.linkNodes({ targetId: 2, edges: [0,3] });
    graph.linkNodes({ targetId: 3, edges: [9] });
    graph.linkNodes({ targetId: 9, edges: [4] });
    graph.linkNodes({ targetId: 4, edges: [5] });
    graph.linkNodes({ targetId: 5, edges: [6] });
    graph.linkNodes({ targetId: 7, edges: [6] });
    graph.linkNodes({ targetId: 6, edges: [7] });
    graph.linkNodes({ targetId: 8, edges: [6] });
    graph.linkNodes({ targetId: 6, edges: [1] });
    expect(graph.toArray(['nodeId', 'edges'])).to.eql([
      { nodeId: 0, edges: [2,3]},
      { nodeId: 1, edges: [6]},
      { nodeId: 2, edges: [0,3]},
      { nodeId: 3, edges: [0,2,9]},
      { nodeId: 4, edges: [9,5]},
      { nodeId: 5, edges: [4,6]},
      { nodeId: 6, edges: [5,7,8,1]},
      { nodeId: 7, edges: [6]},
      { nodeId: 8, edges: [6]},
      { nodeId: 9, edges: [3,4]},
    ]);
    let sum = 0;
    graph.forEach(() => sum++);
    expect(sum).to.eql(10);
    expect(sum).to.not.eql(11);
    expect((graph as any).nodes[0].hasBeenVisited).to.be.false;

    const nodeOrder = [];
    graph.forEach((node) => nodeOrder.push(node.nodeId));
    expect(nodeOrder).to.eql([ 0, 2, 3, 9, 4, 5, 6, 7, 8, 1 ]);
  });
});