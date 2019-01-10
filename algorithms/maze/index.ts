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
export const edges = {
  r1_1: { color: YELLOW, to: ['r3_2', 'r5_2', 'r4_1'] },
  r1_2: { color: GREEN, to: ['r1_1', 'r3_3'] },

  r2_1: { color: YELLOW, to: ['r3_2', 'r5_2', 'r7_1'] },
  r2_2: { color: GREEN, to: ['r2_1', 'r1_1', 'r5_1', 'r5_3'] },

  r3_1: { color: RED, to: ['r2_2', 'r9_1'] },
  r3_2: { color: RED, to: ['r2_2', 'r9_1', 'r6_2'] },
  r3_3: { color: YELLOW, to: ['r4_1', 'r4_2'] },

  r4_1: { color: RED, to: ['r1_2', 'r5_4', 'r6_3'] },
  r4_2: { color: RED, to: ['r1_2', 'r5_4', 'r5_5'] },

  r5_1: { color: YELLOW, to: ['r3_2', 'r5_2', 'r7_1'] },
  r5_2: { color: RED, to: ['r2_2', 'r6_1', 'r6_2'] },
  r5_3: { color: YELLOW, to: ['r3_2', 'r4_1', 'r5_2'] },
  r5_4: { color: GREEN, to: ['r5_3', 'r6_4'] },
  r5_5: { color: GREEN, to: [] }, // this is the ending node so no need to connecto to any other nodes

  r6_1: { color: GREEN, to: ['r5_1', 'r7_2', 'r8_1'] },
  r6_2: { color: GREEN, to: ['r1_1', 'r2_1', 'r5_3', 'r7_2'] },
  r6_3: { color: GREEN, to: ['r5_3', 'r8_3'] },
  r6_4: { color: YELLOW, to: ['r4_2', 'r8_4'] },

  r7_1: { color: RED, to: ['r2_2', 'r6_1', 'r9_1'] },
  r7_2: { color: YELLOW, to: ['r7_1', 'r7_3'] },
  r7_3: { color: RED, to: ['r6_2', 'r6_3', 'r7_4', 'r8_2'] },
  r7_4: { color: GREEN, to: ['r6_4', 'r8_3'] },

  r8_1: { color: YELLOW, to: ['r7_1', 'r9_2'] },
  r8_2: { color: GREEN, to: ['r7_2'] },
  r8_3: { color: YELLOW, to: ['r7_3', 'r9_3'] },
  r8_4: { color: RED, to: ['r7_4', 'r9_4'] },

  r9_1: { color: GREEN, to: ['r2_1', 'r5_1', 'r8_1'] },
  r9_2: { color: RED, to: ['r8_2', 'r9_1'] },
  r9_3: { color: RED, to: ['r8_2', 'r9_4'] },
  r9_4: { color: GREEN, to: ['r8_3'] },
};