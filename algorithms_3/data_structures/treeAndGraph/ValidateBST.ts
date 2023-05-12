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
    const orderedVals = [node.value];
    if (node.left) {
        const leftSubTree = checkBSTValues(node.left);
        if (leftSubTree[1] > node.value) {
            return [Infinity, -Infinity];
        }
        orderedVals.unshift(leftSubTree[0]);
    }

    if (node.right) {
        const rightSubTree = checkBSTValues(node.right);
        if (node.value > rightSubTree[0]) {
            return [Infinity, -Infinity];
        }
        orderedVals.push(rightSubTree[1]);
    }

    return [
        orderedVals[0], // min
        orderedVals[orderedVals.length-1] // max
    ];
}

function validateBST(node) {
    const [min, max] = checkBSTValues(node);
    return min <= max;
}

describe('validate BST', () => {
    it('should return true', () => {
        const node1 = { value: 1, left: null, right: null };
        expect(validateBST(node1)).to.equal(true);
    });
    it('should return true', () => {
        const node1 = { value: 1, left: null, right: null };
        const node2 = { value: 2, left: null, right: null };
        const node3 = { value: 3, left: null, right: null };
        const node4 = { value: 4, left: null, right: null };
        const node5 = { value: 5, left: null, right: null };
        const node6 = { value: 6, left: null, right: null };
        const node7 = { value: 7, left: null, right: null };

        node4.left = node2;
        node4.right = node6;
        node2.left = node1;
        node2.right = node3;

        node6.left = node5;
        node6.right = node7;

        expect(validateBST(node4)).to.equal(true);
    });
    it('should return false', () => {
        const node1 = { value: 1, left: null, right: null };
        const node2 = { value: 2, left: null, right: null };
        const node3 = { value: 3, left: null, right: null };
        const node4 = { value: 44, left: null, right: null };
        const node5 = { value: 5, left: null, right: null };
        const node6 = { value: 6, left: null, right: null };
        const node7 = { value: 7, left: null, right: null };

        node4.left = node2;
        node4.right = node6;
        node2.left = node1;
        node2.right = node3;

        node6.left = node5;
        node6.right = node7;

        expect(validateBST(node4)).to.equal(false);
    });
});
