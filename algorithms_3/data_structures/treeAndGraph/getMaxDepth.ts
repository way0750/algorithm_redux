export function getMaxDepth(root, depth = 1) {
    if (!root) return depth - 1;
    return Math.max(getMaxDepth(root.left, depth + 1), getMaxDepth(root.right, depth + 1));
}
function getMaxDepthBFS(root) {
    if (!root) return 0;
    let curLevel = [root];
    let levelCount = 0
    while (curLevel.length) {
        levelCount++;
        const newLevel = [];
        curLevel.forEach((node) => {
            if (node.left) newLevel.push(node.left);
            if (node.right) newLevel.push(node.right);
        });
        curLevel = newLevel;
    }
    return levelCount;
}

describe('test', () => {
    it('should work', () => {
        const node1 = { value: 1, left: null, right: null };
        const node2 = { value: 1, left: null, right: null };
        const node3 = { value: 1, left: null, right: null };
        const node4 = { value: 1, left: null, right: null };
        node1.left = node2;
        node1.right = node3;
        node3.right = node4;
        expect(getMaxDepthBFS(node1)).to.equal(3);
    });
});