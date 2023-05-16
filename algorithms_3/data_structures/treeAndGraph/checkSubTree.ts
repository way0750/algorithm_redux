/**
 * Check Subtree: T l and T2 are two very large binary trees, with T l much bigger than T2.
 * Create an algorithm to determine if T2 is a subtree of Tl.  A tree T2 is a subtree ofT i if
 * there exists a node n in T i such that the subtree of n is identical to T2. That is,
 * if you cut off the tree at node n, the two trees would be identical.
 * 
 * just keep on checking node by node betwee two tree, this is going to take a long time...
 * 
 * two functions:
 * 1st: doing a dfs on the big tree node by node and compare to tree 2's root
 *  whenever the the two nodes share the same values
 *  then recursively call 2nd function to compare all nodes of the 2nd tree
 * time: O(n * m), space: O(logN);
 * 
 */
// it's better to do breadth first search because DFS you can end up
// going all the way to a leaf of tree1 but there is no way you even
// need to go that far because tree2 is tall too
export function isSubTree(tree1, tree2) {
    if (!tree2) return true;
    if (!tree1) return false;

    let curLevel = [tree1];
    while (curLevel.length) {
        const nextLevel = [];
        const isSubTree = curLevel.some((node) => { 
            if (node.left) {
                nextLevel.push(node.left);
            }
            if (node.right) {
                nextLevel.push(node.right);
            }
            return node.value === tree2.value && compareTrees(node, tree2);
        });
        if (isSubTree) {
            return true;
        } else {
            curLevel = nextLevel;
        };
    }

    return false;
}

function compareTrees (tree1, tree2){
    if (!tree2) return true;
    // already at the end but tree2 is still not 100% compared
    if (!tree1) return false;

    if (tree1.value !== tree2.value) return false;
    return compareTrees(tree1.left, tree2.left) && compareTrees(tree1.right, tree2.right);
}

describe('compare sub trees', () => {
    it('should return true', () => {
        const node1 = { value: '1', left: null, right: null };
        const node2 = { value: '2', left: null, right: null };
        const node3 = { value: '3', left: null, right: null };
        const node4 = { value: '4', left: null, right: null };
        const node5 = { value: '5', left: null, right: null };
        const node6 = { value: '6', left: null, right: null };
        const node7 = { value: '7', left: null, right: null };
        node4.left = node2;
        node4.right = node6;
        node2.left = node1;
        node2.right = node3;
        node6.left = node5;
        node6.right = node7;

        const tree1 = node2;

        const nodeA = { value: '1', left: null, right: null };
        const nodeB = { value: '2', left: null, right: null };
        const nodeC = { value: '3', left: null, right: null };
        nodeB.left = nodeA;
        nodeB.right = nodeC;
        const tree2 = nodeB;

        expect(isSubTree(tree1, tree2)).to.equal(true);
    });
});