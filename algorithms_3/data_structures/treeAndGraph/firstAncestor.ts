
/**
 * First Common Ancestor: Design an algorithm and write code to find the first common
 * ancestor of two nodes in a binary tree. Avoid storing additional nodes in a data structure.
 * NOTE: This is not necessarily a binary search tree.
 * 
 * search from root node see if both nodes are found in the search
 * if yes, then search root.left again
 *      if root.left return false, then search with root.right
 *          if root.right return false, then root is the first common ancestor
 * so have two functions
 *      1: get first ancestor
 *      2: breadth first search to merely find both nodes in the sub tree
 * 
 * time: O(n^2), space: O(logN or depth because of the recursive call)
 */

export function getFirstAncestor (tree, node1, node2) {
    if (tree === null) return null;

    const isAncestor = findNodes(tree, node1, node2);
    if (isAncestor) {
        const ancestorFromSubTree =
            getFirstAncestor(tree.left, node1, node2)
            || getFirstAncestor(tree.right, node1, node2);
        return ancestorFromSubTree || tree;
    } else {
        return null;
    }
}

function findNodes (tree, node1, node2) {
    let curLevel = [tree];
    let targetNodes = [node1, node2];
    while (curLevel.length && targetNodes.length) {
        curLevel.forEach((node) => {
            if (node === targetNodes[0]) {
                targetNodes = targetNodes.slice(1);
            }
            if (node === targetNodes[1]) {
                targetNodes = targetNodes.slice(0,1);
            }
        });

        const nextLevel = [];
        curLevel.forEach((node) => {
            node.left && nextLevel.push(node.left);
            node.right && nextLevel.push(node.right);
        });

        curLevel = nextLevel;
    }
    return targetNodes.length === 0;
}

describe('first common ancestor', () => {
    it('should return root node', () => {
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

        expect(getFirstAncestor(node4, node1, node7)).to.equal(node4);

    });
    it('should return node1', () => {
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

        expect(getFirstAncestor(node4, node2, node1)).to.equal(node2);

    });
});

/**
 * another solution add the parent points to each node
 * then for node 1, keep adding flag upward
 * then for the 2nd node just keep searching upward to find node 1's flag
 */

function addParentRef (tree, parent = null) {
    if (!tree) return;
    tree.parent = parent;
    addParentRef(tree.left, tree);
    addParentRef(tree.right, tree);
}

function findClosestCommon(tree, node1, node2) {
    addParentRef(tree);
    let node1Parent = node1;
    while (node1Parent) {
        node1Parent.visited = true;
        node1Parent = node1Parent.parent;
    }

    let node2Parent = node2;
    while(node2Parent) {
        if (node2Parent.visited) {
            return node2Parent;
        }
        node2Parent = node2Parent.parent;
    }
    return null;
}

describe('first common ancestor 2nd try', () => {
    it('should return root node', () => {
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

        expect(findClosestCommon(node4, node1, node7)).to.equal(node4);

    });
    it('should return node1', () => {
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

        expect(findClosestCommon(node4, node2, node1)).to.equal(node2);

    });
});