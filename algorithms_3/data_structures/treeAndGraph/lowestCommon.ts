/**
 * inspired by the jointed two-singled linked list challenge:
 * get the entire path to p, and the entire path to q.
 * then just compare from the root, one level at the time to find the last pair
 * of nodes that the same (ancestor)
 * 
 */
export function lowestCommonAncestor(root, p, q) {
    // use to tell the search part of the function how many of the nodes have been found
    let foundNodes = 0;
    function search(root) {
        /**
         * base case:
         *  if root is null/undefined: return null;
         *  whenever p or q is found, and foundNodes count is 2, then return [[path to p]]
         * what to always return:
         *  null/[[], [maybe]]
         * what to do with return:
         *  keep on returning them
         * how to break problem smaller:
         *  check foundNodes count: as long as it is not 2
         *      keep recursively calling the function by passing root.left and right
         */
        if (!root) return null;
        const paths = [];
        if (root === p || root === q) {
            paths.push([root]);
            foundNodes++;
            if (foundNodes === 2) {
                return paths;
            }
        }

        let pathFromLeft = search(root.left);
        if (pathFromLeft) {
            pathFromLeft = pathFromLeft.map((path) => [root, ...path]);
            paths.push(...pathFromLeft);
        }

        if (foundNodes < 2) {
            let pathFromRight = search(root.right);
            if (pathFromRight) {
                pathFromRight = pathFromRight.map((path) => [root, ...path]);
                paths.push([root, ...pathFromRight]);
            }
        }

        return paths.length ? paths : null;
    };

    const [path1, path2] = search(root);

    let ancestor = null;
    while (path1[0] === path2[0]) {
        ancestor = path1[0]
        path1.shift();
        path2.shift();
    }
    return ancestor;
}

describe('test', () => {
    it('should return the node', () => {
        const node1 = { value: 1, left: null, right: null };
        const node2 = { value: 2, left: null, right: null };
        const node3 = { value: 3, left: null, right: null };
        const node4 = { value: 4, left: null, right: null };
        const node5 = { value: 5, left: null, right: null };
        const node6 = { value: 6, left: null, right: null };
        const node7 = { value: 7, left: null, right: null };
        node4.left = node2;
        node4.right = node6;
        node2.left = node1;
        node2.right = node3;
        node6.left = node5;
        node6.right = node7;

        expect(lowestCommonAncestor(node4, node2, node7)).to.equal(node4);
    });
});