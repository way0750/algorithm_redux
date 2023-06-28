export function avgSum (tree) {
    if (!tree) return NaN;
    let curMax = -Infinity;
    let curMaxAvgTree = null;
    function search (tree) {
        let curSum = tree.val;
        let curNodeCount = 1;
        if (tree.left) {
            const { avg, nodeCount } = search(tree.left);
            curSum += avg * nodeCount
            curNodeCount += nodeCount;
        }
        if (tree.right) {
            const { avg, nodeCount } = search(tree.right);
            curSum += avg * nodeCount
            curNodeCount += nodeCount;
        }

        const curAvg = curSum / curNodeCount;
        if (curAvg > curMax) {
            curMax = curAvg;
            curMaxAvgTree = tree;
        }

        return {
            avg: curAvg,
            nodeCount: curNodeCount,
        };
    }
    search(tree);
    return curMaxAvgTree;
}

describe('', () => {
    it('', () => {
        const node1 = { val: 1, left: null, right: null };
        const node2 = { val: 2, left: null, right: null };
        const node3 = { val: 3, left: null, right: null };
        const node4 = { val: 4, left: null, right: null };
        const node5 = { val: 5, left: null, right: null };
        const node6 = { val: 6, left: null, right: null };
        const node7 = { val: 7, left: null, right: null };
        node4.left = node2;
        node4.right = node6;
        node2.left = node1;
        node2.right = node3;
        node6.left = node5;
        node6.right = node7;
        expect(avgSum(node4)).to.equal(4);
    });
});

function getPathsOfSum(tree, target) {
    if (!tree) return [];
    if (target - tree.val === 0 && !tree.left && !tree.right) {
        return [[tree.val]];
    }
    const leftPaths = getPathsOfSum(tree.left, target - tree.val) || [];
    const rightPaths = getPathsOfSum(tree.right, target - tree.val) || [];
    const allPaths = [...leftPaths, ...rightPaths];
    return allPaths.map((path) => [tree.val, ...path]);
}

describe('', () => {
    it('', () => {
        const node1 = { val: 9, left: null, right: null };
        const node2 = { val: 3, left: null, right: null };
        const node3 = { val: 4, left: null, right: null };
        const node4 = { val: 1, left: null, right: null };
        const node5 = { val: 4, left: null, right: null };
        const node6 = { val: 3, left: null, right: null };
        const node7 = { val: 9, left: null, right: null };
        node4.left = node2;
        node4.right = node6;
        node2.left = node1;
        node2.right = node3;
        node6.left = node5;
        node6.right = node7;
        expect(getPathsOfSum(node4, 13)).to.equal([]);
    });
});

function maxPath(tree) {
    if (!tree) return 0;
    return Math.max(maxPath(tree.left), maxPath(tree.right)) + 1;
}

function mergeTrees(t1, t2) {
    if (t1 === null && t2 === null) return null;
    const node1 = t1 || { val: 0, left: null, right: null };
    const node2 = t1 || { val: 0, left: null, right: null };
    return {
        val: node1.val + node2.val,
        left: mergeTrees(node1.left, node2.left),
        right: mergeTrees(node1.right, node2.right),
    };
}