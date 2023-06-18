/**
 * given a binary tree, find the diameter
 *     1
      / \
     2   3
    / \     
   4   5   
The function should return 3, which is the length of the path [4,2,1,3] or [5,2,1,3].

just get the longest path from left + the longest from the right
and then maintain a global max
 */

export function diameterOfBinaryTree(root) {
    let maxDistant = 0;

    function search(root) {
        if (!root) return 0;
        const maxLeft = search(root.left);
        const maxRight = search(root.right);
        maxDistant = Math.max(maxDistant, maxLeft + maxRight);
        return Math.max(maxLeft, maxRight) + 1;
    }

    search(root);
    return maxDistant;
}

describe('should work', () => {
    it('should work', () => {
        const node1 = { val: 1, left: null, right: null };
        const node2 = { val: 2, left: null, right: null };
        const node3 = { val: 3, left: null, right: null };
        const node4 = { val: 4, left: null, right: null };
        const node5 = { val: 5, left: null, right: null };
        node1.left = node2;
        node1.right = node3;
        node2.left = node4;
        node2.right = node5;
        expect(diameterOfBinaryTree(node1)).to.equal(3);
    });
});