/**
 * just use recursion to solve it:
 * recursive case:
 *      if there is left child, recursively call left child
 *      same with right child
 * what to always return:
 *      a node, the head of a link list
 * what to do with return:
 *      for return from left child: remove the reference, and add it to node.right
 *      for the right child: add it to the end of the new right's end
 * what to always return:
 *      the root of current sub tree
 */

export function flatten(root) {
    let curEnd = null;
    function search(root) {
        curEnd = root;
        const oldRight = root.right;
        if (root.left) {
            root.right = search(root.left);
        }
        root.left = null;
        if (oldRight) {
            curEnd.right = search(oldRight);
        }
        return root;
    }

    search(root);
    // return nothing per requirement
}

describe('test', () => {
    it('should work', () => {
        const node1 = { value: 1, left: null, right: null };
        const node2 = { value: 2, left: null, right: null };
        const node3 = { value: 3, left: null, right: null };
        const node4 = { value: 4, left: null, right: null };
        const node5 = { value: 5, left: null, right: null };
        const node6 = { value: 6, left: null, right: null };
        node1.left = node2;
        node1.right = node5;
        node2.left = node3;
        node2.right = node4;
        node5.right = node6;

        flatten(node1);
        expect(node1).to.equal(null);
    });
});