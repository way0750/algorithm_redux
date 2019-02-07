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

export function nextInOrderSuccessor(tree, node) {

}