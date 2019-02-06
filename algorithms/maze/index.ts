// the problem is from here:
// https://www.popsci.com/worlds-hardest-maze

/**
 * Essentially this is a graph traversal problem
 * 
 * constrains:
 * you must traverse in this order: red, green, yellow
 * you can not go through the same node twice in a row
 * you have to go from r3_1 to r5_5
 * see the graph in the same dir
 * 
 * solution make one directional graph with nodes in the picture
 * set r3_1 as the starting node and the goal is to traverse from r3_1 to r5_5
 * set path to an array, we will put nodes that we have traversed through in it
 *   and can use it to see if we are about to go through a node twice in a row
 *   and we can use it to find all paths and then get the shortest one
 */
const GREEN = 'green';
const RED = 'red';
const YELLOW = 'yellow';
export let nodes = {
  r1_1: { id: 'r1_1', visited: false, color: YELLOW, to: ['r3_2', 'r5_2', 'r4_1'] },
  r1_2: { id: 'r1_2', visited: false, color: GREEN, to: ['r1_1', 'r3_3'] },

  r2_1: { id: 'r2_1', visited: false, color: YELLOW, to: ['r3_2', 'r5_2', 'r7_1'] },
  r2_2: { id: 'r2_2', visited: false, color: GREEN, to: ['r2_1', 'r1_1', 'r5_1', 'r5_3'] },

  r3_1: { id: 'r3_1', visited: false, color: RED, to: ['r2_2', 'r9_1'] },
  r3_2: { id: 'r3_2', visited: false, color: RED, to: ['r2_2', 'r9_1', 'r6_2'] },
  r3_3: { id: 'r3_3', visited: false, color: YELLOW, to: ['r4_1', 'r4_2'] },

  r4_1: { id: 'r4_1', visited: false, color: RED, to: ['r1_2', 'r5_4', 'r6_3'] },
  r4_2: { id: 'r4_2', visited: false, color: RED, to: ['r1_2', 'r5_4', 'r5_5'] },

  r5_1: { id: 'r5_1', visited: false, color: YELLOW, to: ['r3_2', 'r5_2', 'r7_1'] },
  r5_2: { id: 'r5_2', visited: false, color: RED, to: ['r2_2', 'r6_1', 'r6_2'] },
  r5_3: { id: 'r5_3', visited: false, color: YELLOW, to: ['r3_2', 'r4_1', 'r5_2'] },
  r5_4: { id: 'r5_4', visited: false, color: GREEN, to: ['r5_3', 'r6_4'] },
  r5_5: { id: 'r5_5', visited: false, color: GREEN, to: [] }, // this is the ending node so no need to connect to to any other nodes

  r6_1: { id: 'r6_1', visited: false, color: GREEN, to: ['r5_1', 'r7_2', 'r8_1'] },
  r6_2: { id: 'r6_2', visited: false, color: GREEN, to: ['r1_1', 'r2_1', 'r5_3', 'r7_2'] },
  r6_3: { id: 'r6_3', visited: false, color: GREEN, to: ['r5_3', 'r8_3'] },
  r6_4: { id: 'r6_4', visited: false, color: YELLOW, to: ['r4_2', 'r8_4'] },

  r7_1: { id: 'r7_1', visited: false, color: RED, to: ['r2_2', 'r6_1', 'r9_1'] },
  r7_2: { id: 'r7_2', visited: false, color: YELLOW, to: ['r7_1', 'r7_3'] },
  r7_3: { id: 'r7_3', visited: false, color: RED, to: ['r6_2', 'r6_3', 'r7_4', 'r8_2'] },
  r7_4: { id: 'r7_4', visited: false, color: GREEN, to: ['r6_4', 'r8_3'] },

  r8_1: { id: 'r8_1', visited: false, color: YELLOW, to: ['r7_1', 'r9_2'] },
  r8_2: { id: 'r8_2', visited: false, color: GREEN, to: ['r7_2'] },
  r8_3: { id: 'r8_3', visited: false, color: YELLOW, to: ['r7_3', 'r9_3'] },
  r8_4: { id: 'r8_4', visited: false, color: RED, to: ['r7_4', 'r9_4'] },

  r9_1: { id: 'r9_1', visited: false, color: GREEN, to: ['r2_1', 'r5_1', 'r8_1'] },
  r9_2: { id: 'r9_2', visited: false, color: RED, to: ['r8_2', 'r9_1'] },
  r9_3: { id: 'r9_3', visited: false, color: RED, to: ['r8_2', 'r9_4'] },
  r9_4: { id: 'r9_4', visited: false, color: GREEN, to: ['r8_3'] },
};

// map each edge in the node.to to a node
const nodeIds = Object.keys(nodes);
nodeIds.forEach((nodeId) => {
  nodes[nodeId].to = nodes[nodeId].to.map((edgeId: string) => {
    return nodes[edgeId];
  });
});

/**
 * base case:
 *   if current node is the end node return [current node]
 *   if current node is visited simply return []
 *     this will take care of the don't-visit-same-node-twice-in-a-row problem
 *     prevent infinite loop, keep going to the same node isn't not going anywhere
 * what to return 
 *   always return an array potentially with nodes, it means a sub path
 * what to do with return
 *   compare with other sub path from sibilings, keep the shortest one
 * how to make problem smaller/how to recursively call
 *   just recursively call with each .to node
 */

export function findPath(curNode, endNode): Array<object> {
  if (curNode === endNode) {
    return [curNode];
  } else if (curNode.visited) {
    // dead end path
    return [];
  } else {
    let curShortestSubPath = [];
    curNode.visited = true;
    curNode.to.forEach((edgeNode) => {
      const subPath = findPath(edgeNode, endNode);
      if (!curShortestSubPath.length) {
        curShortestSubPath = subPath;
      } else if (subPath.length && subPath.length < curShortestSubPath.length) {
        curShortestSubPath = subPath;
      }
    });

    if (curShortestSubPath.length) {
      curShortestSubPath.unshift(curNode);
    }
    return curShortestSubPath;
  }
}

const path = findPath(nodes.r3_1, nodes.r5_5);
const pathString = path.map((node: { color: string, id: string }) => {
  return `${node.id}:${node.color}`;
});
console.log(pathString.join(' '));
/**
 * r3_1:red
 * r2_2:green
 * r2_1:yellow
 * r3_2:red
 * r9_1:green
 * r5_1:yellow
 * r5_2:red
 * r6_1:green
 * r7_2:yellow
 * r7_3:red
 * r6_2:green
 * r1_1:yellow
 * r4_1:red
 * r1_2:green
 * r3_3:yellow
 * r4_2:red
 * r5_5:green
 */