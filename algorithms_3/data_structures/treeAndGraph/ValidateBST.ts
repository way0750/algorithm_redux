/**
 * Validate BST: Implement a function to check if a binary tree is a binary search tree.
 * 
 * flatten the entire tree and compare from one value to next
 * time: O(n), space: O(n) n === node count
 * or recursively check each and every node to see if it is a BST
 *  then return [ min of sub tree, max of sub tree ] to upper call stack for further comparision
 * if sub tree isn't BST just return [ Infinity, -Infinity ]
 * 
 * then have a contraining function to check the final return value
 *  [ a < b] then yes 
 *  [ a > b] then false
 * 
 * recursive call case: call with left or right if left or right node exist
 * what to always return: [min max from sub tree] 
 * what to do with return: if returned from left, then compare [min max] with current value
 *      make sure order is [min max current val]
 *      similar with right sub tree
 *      if out of order then return [Infinity, -Infinity] to signify that sub tree isn't BST
 * how to break problem smaller: just call left/right node
 * 
 */


export function checkBSTValues(node) {
    let leftSubTree;
    if (node.left) {
        leftSubTree = validateBST(node.left);
        if (leftSubTree[1] > node.value) {
            return [Infinity, -Infinity];
        }
    }

    let rightSubTree;
    if (node.right) {
        rightSubTree = validateBST(node.right);
        if (node.value > rightSubTree[0]) {
            return [Infinity, -Infinity];
        }
    }

    return [leftSubTree[0], rightSubTree[1]];
}

function validateBST(node) {
    const [min, max] = checkBSTValues(node);
    return min <= max;
}
