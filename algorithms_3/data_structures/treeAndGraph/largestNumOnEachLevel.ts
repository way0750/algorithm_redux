/**
 * just do a depth first search to keep the complexity to minimum
 * then just keep an array for each level, and update the value as you go
 */

export function maxValAtLevel001 (root) {
    const maxNums = [];
    function search(root, level) {
        if (!root) return;
        if (maxNums[level] === undefined) {
            maxNums[level] = -Infinity;
        }
        maxNums[level] = Math.max(maxNums[level], root.value);
        search(root.left, level+1);
        search(root.right, level+1);
    }
    search(root, 0);
    return maxNums;
}

function maxValAtLevel (root, level = 0, maxNums = []) {
    if (!root) return maxNums;
    if (maxNums[level] === undefined) maxNums[level] = -Infinity;
    maxNums[level] = Math.max(maxNums[level], root.value);
    maxValAtLevel(root.left, level+1, maxNums);
    maxValAtLevel(root.right, level+1, maxNums);
    return maxNums;
}

describe('should work', () => {
    it('should work', () => {
        const node1 = { value: 1, left: null, right: null };
        const node2 = { value: 2, left: null, right: null };
        const node3 = { value: 3, left: null, right: null };
        const node33 = { value: 3, left: null, right: null };
        const node5 = { value: 5, left: null, right: null };
        const node9 = { value: 9, left: null, right: null };
        node1.left = node3;
        node1.right = node2;
        node3.left = node5;
        node3.right = node33;
        node2.right = node9;
        expect(maxValAtLevel(node1)).to.equal([1,3,9]);
    });
});