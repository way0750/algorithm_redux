export function isBinarySearchTree1(root) {
    /**
     * recursive case:
     *      if there is left or is there is right
     * what to always return:
     *      [min of sub tree, max of sub tree]
     *      or null if not binary search tree
     * what to do with return:
     *      if left, then make sure that the [1] <= current node.value
     *      if right, then current node.value <= [0]
     * how to make problem smaller:
     *      just recursively call left or right
     */
    function search(root) {
        // in case there aren't left or right
        const orderedValues = [root.value, root.value];

        if (root.left) {
            const subOrderedVals = search(root.left);
            if (!subOrderedVals || subOrderedVals[1] > root.value) {
                return null
            } else {
                orderedValues.push(subOrderedVals[0]);
            }
        }
        if (root.right) {
            const subOrderedVals = search(root.right);
            if (!subOrderedVals || subOrderedVals[0] < root.value) {
                return null
            } else {
                orderedValues.push(subOrderedVals[1]);
            }
        }
        return [
            Math.min(...orderedValues),
            Math.max(...orderedValues),
        ]
    }

    const result = search(root);
    return !!result && result[0] < result[1];
}

export function isBinarySearchTree(root, min = null, max = null) {
    if (!root) return true;
    if (min !== null && root.value <= min) return false;
    if (max !== null && root.value >= max) return false;
    return isBinarySearchTree(root.left, min, root.value) && isBinarySearchTree(root.right, root.value, max);
}

describe('test', () => {
    it('should', () => {
        const node1 = { value: 1, left: null, right: null };
        const node2 = { value: 2, left: null, right: null };
        const node3 = { value: 3, left: null, right: null };
        node2.left = node1;
        node2.right = node3;
        expect(isBinarySearchTree(node2)).to.equal(true);
    });
});