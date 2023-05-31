/**
 * Paths with Sum:
 * You are given a binary tree in which each node contains an integer
 * value (which might be positive or negative). Design an algorithm to
 * count the number of paths that sum to a given value. The path does not
 * need to start or end at the root or a leaf, but it must go downwards
 * (traveling only from parent nodes to child nodes).
 * 
 * just keep on currentNode.value - target value and pass the remining to the next
 * recursive call, when currentNode.value === targetValue then return 1 for finding 1 path
 * when currentNode is null but target is still > 0, then return 0
 * 
 * then have another contraining function to go from node to node with the original target value
 *  and collect all the possible paths count
 * 
 * time: O(n^2), space: O(2^logN or depth)
 */

export function getAllPathCount (node, targetVal) {
    if (!node) return 0;
    const mainNodeCount = getSubPathCount(node, targetVal)
    const leftNodeCount = getSubPathCount(node.left, targetVal)
    const rightNodeCount = getSubPathCount(node.right, targetVal);
    return mainNodeCount + leftNodeCount + rightNodeCount;
};

function getSubPathCount(node, targetVal) {
    if (!node && targetVal !== 0) return 0;
    if (!node && targetVal === 0) return 1;
    let curCount = 0;
    if (node.value === targetVal) curCount += 1;
    // keep going to find all possible paths

    curCount += node.left ? getSubPathCount(node.left, targetVal - node.value) : 0;
    curCount += node.right ? getSubPathCount(node.right, targetVal - node.value) : 0;

    return curCount;
}

describe('get all possible path count', () => {
    it('should get all the path count for a tree that is all 0s', () => {
        const node1 = { id: '1',value: 1, left: null, right: null };
        const node2 = { id: '2',value: 1, left: null, right: null };
        const node3 = { id: '3',value: 1, left: null, right: null };
        const node4 = { id: '4',value: 1, left: null, right: null };
        const node5 = { id: '5',value: 1, left: null, right: null };
        const node6 = { id: '6',value: 1, left: null, right: null };
        const node7 = { id: '7',value: 1, left: null, right: null };

        node4.left = node2;
        node4.right = node6;

        node2.left = node1;
        node2.right = node3;
        node6.left = node5;
        node6.right = node7; 

        const root = node4;
        expect(getAllPathCount(root, 1)).to.equal(7);
    });
});