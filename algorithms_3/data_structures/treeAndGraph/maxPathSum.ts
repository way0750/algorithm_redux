/**
 * find the max path sum in a tree
 * like find a sub array with max sum, negative numbers are ok as long as the cur
 * sub path sum isn't <= 0
 * 
 * so, keep a global max as you go through each node
 * then left max + cur node.value + right max
 * if left max is negative then just replace it to 0 as "not using it"
 * same with right
 * 
 * now, after updating global max, return either left max+cur node value
 * or the right max + cur node value
 * or the cur node value if both sub path return <= 0
 */

export function maxPathSum(root) {
    let globalMax = root.value;
    function search(root) {
        if (root === null) return 0;
        const leftMax = Math.max(search(root.left), 0);
        const rightMax = Math.max(search(root.right), 0);
        globalMax = Math.max(globalMax, leftMax + root.value + rightMax);
        return Math.max(leftMax + root.value, rightMax + root.value);
    }
    search(root);
    return globalMax;
}

describe('test', () => {
    it('should work', () => {
        const node1 = { value: -1, left: null, right: null };
        const node2 = { value: -2, left: null, right: null };
        const node3 = { value: 3, left: null, right: null };
        node1.left = node2;
        node1.right = node3;
        expect(maxPathSum(node1)).to.equal(6);
    });
});