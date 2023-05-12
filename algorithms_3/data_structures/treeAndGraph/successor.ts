/**
 * Successor: Write an algorithm to find the "next" node (i.e., in-order successor) of a given
 * node in a binary search tree. You may assume that each node has a link to its parent.
 * 
 * if next node means the first node on the right when the tree gets flatten to 1-d
 * then: to find it: if there is right sub tree, get the left most of the sub tree
 *      if there isn't right sub tree, then get the parent
 * time: O(n), space: O(1);
 */

export function getSuccessor (node) {
    if (node.right) {
        // depth first search to get the left most node of the sub tree;
        let nextNode = node.right;
        while(nextNode) {
            if (nextNode.left) {
                nextNode = nextNode.left;
            } else {
                return nextNode;
            }
        }
    } else {
        return node.value >= node.parent ? null : node.parent;
    }
}