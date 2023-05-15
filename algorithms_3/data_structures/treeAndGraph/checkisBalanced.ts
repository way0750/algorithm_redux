/**
 * Implement a function to check if a binary tree is balanced. For the purposes of this question,
 * a balanced tree is defined to be a tree such that the heights of the two subtrees of
 * any node never differ by more than one.
 * 
 * check at each and every single node to see if it is balance at that level
 * balanced means the longest paths of left and right sub tree are not differnt than > 1
 * 
 */

export function getMaxPathLength (node) {
    if (!node) return 0;
    return Math.max(getMaxPathLength(node.left), getMaxPathLength(node.right)) + 1;
}

function isBalanced(node) {
    if (!node) return true;
    const leftMaxDistance = getMaxPathLength(node.left);
    const rightMaxDistance = getMaxPathLength(node.right);
    if (Math.abs(leftMaxDistance - rightMaxDistance) > 1) return false;
    return isBalanced(node.left) && isBalanced(node.right);
}