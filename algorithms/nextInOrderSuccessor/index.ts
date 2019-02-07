/**
 * Given a node in a binary search tree, return the next bigger element, also
 * known as the in order successor. For example, the in order successor of 22 is 30.
      10
      /  \
    5    30
        /  \
      22    35
  
 * the next in order node in a binary search tree is the one found at current
 * node's right
 * which ever is the immediately node would be that next in order node
 * 
 * if there is a right child node on current node
 *   and then the last node on the straight
 *     left path on that right child node would be the next in order node
 *   and if the right child node doesn't have anything on its left side
 *     then the right child node it the next in order node
 * if there isn't right child node on current node
 *    then the immediate parent is the next in order node
 * 
 * else there isn't next in order node
 * 
 * solution:
 * assuming you don't have access to immediate parent
 * check current node to see if there is a right child node
 *   if yes then check the last node on the right child node's left path
 *   if no, then search from the root node tree to find the target node 
 *     but make sure to keep the reference to parent of node when you search
 */

/**
 * base case: curNode === targetNode
 *  return parentNode
 * what to always return:
 *   parentNode || null for no node found in path;
 * what to do with return:
 *   keep returning it
 *   but you will get 2 returns, so return the node one not the null
 * how to recursively call with curNode's left child and then right child
 *   make sure to pass self as parent node
 */
function findNodeInTree(curNode, targetNode, parentNode) {
  if (curNode === targetNode) {
    parentNode;
  }

  return findNodeInTree(curNode.left, targetNode, curNode) || findNodeInTree(curNode.right, targetNode, curNode);
}

export function nextInOrderSuccessor(tree, node) {
  const hasRightTree = !!node.right;
  // find the last node on the right sub tree's left path
  if (hasRightTree) {
    let leftDescNode = node.right;
    while(!!leftDescNode.left) {
      leftDescNode = leftDescNode.left;
    }
    return leftDescNode;
  }

  // tree traversal to find the node, but return its parent
  const nextInOrderNode = findNodeInTree(tree, node, null);
  return nextInOrderNode;
}