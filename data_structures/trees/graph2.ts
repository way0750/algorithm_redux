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
        if (this.nodes[edgeId].visited === false) {
          this.nodes[edgeId].visited = true;
          nodeIds.push(edgeId);
        }
      });
    }

    return false;
  }
}