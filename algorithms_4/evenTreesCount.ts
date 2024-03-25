/**
 * This problem was asked by Adobe.

You are given a tree with an even number of nodes. Consider each connection between a parent and child node to be an "edge". You would like to remove some of these edges, such that the disconnected subtrees that remain each have an even number of nodes.

For example, suppose your input was the following tree:

   1
  / \ 
 2   3
    / \ 
   4   5
 / | \
6  7  8
In this case, removing the edge (3, 4) satisfies our requirement.

Write a function that returns the maximum number of edges you can remove while still satisfying this requirement.

solution:
bascially it's about finding all the sub trees that have even numbers of nodes (including self)
use recursion:
base case
  null node: return 0
what to always return:
    integer, the amount of nodes from sub tree
what to do with returns:
    if it's the sum of all sub tree returns is odd, then after + self, you will get an even count of nodes
      ++evenTreesCount
      then return 0
    if it's even then return the sum + self (1)
how to make problem smaller
    just recursively call all children
 */

export const getEvenTreesCount = (tree) => {
    let evenTreesCount = 0;
    const search = (tree) => {
        if (!tree) return 0;
        // assuming tree.children = [n1, n2, n3.....]
        const subTreeSum = tree.children.reduce((sum, child) => sum += search(child), 0);
        let curTreeSum = subTreeSum + 1;
        if (subTreeSum % 2 === 0) {
            evenTreesCount++;
            curTreeSum = 0;
        }

        return curTreeSum;
    }

    search(tree);
    return evenTreesCount;
}
