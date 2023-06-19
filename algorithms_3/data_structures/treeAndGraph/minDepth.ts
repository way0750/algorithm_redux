/**
 * breadth first search,
 * at each level, check if there is a node that has no children
 * if yes, then return true
 */

export function minDepth(root) {
    let curLevel = [root];
    let level = 1;
    while (curLevel.length) {
        for (let i = 0; i < curLevel.length; i++) {
            const node = curLevel[i];
            if (node.left === null && node.right === null) return level;
        }
        curLevel = curLevel.reduce((newLevel, node) => {
            if (node.left) newLevel.push(node.left);
            if (node.right) newLevel.push(node.right);
            return newLevel;
        }, []);
        level++;
    }
    // level was ahead of the level count:
    return level - 1;
}

function minDepthRecursive(root, curDepth = 1, curMinDepth = Infinity) {
    if (curDepth >= curMinDepth) return Math.min(curDepth, curMinDepth);
    if (root === null) return Math.min(curDepth-1, curMinDepth);
    if (root.left === null && root.right === null ) Math.min(curMinDepth, curDepth)
    curMinDepth = Math.min(curMinDepth, minDepthRecursive(root.left, curDepth + 1, curMinDepth));
    curMinDepth = Math.min(curMinDepth, minDepthRecursive(root.right, curDepth + 1, curMinDepth));
    return curMinDepth;
}

describe('should work', () => {
    it('should work', () => {
        /**
         *     3
              / \
             9  20
               /  \
              15   7
         */
        const node3 = { value: 3, left: null, right: null };
        const node9 = { value: 9, left: null, right: null };
        const node20 = { value: 20, left: null, right: null };
        const node15 = { value: 15, left: null, right: null };
        const node7 = { value: 7, left: null, right: null };
        node3.left = node9;
        node3.right = node20;
        node20.left = node15;
        node20.right = node7;
        expect(minDepthRecursive(node3)).to.equal(2);
    });
});
