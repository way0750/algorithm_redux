/**
 * Given a binary tree, design an algorithm which creates a linked list of all the nodes
 * at each depth (e.g., if you have a tree with depth 0, you'll have 0 linked lists).
 * 
 * well just get all the nodes at each level and make link list with them.
 * time: O(n), space: O(n);
 */

export function listOfDepth (tree) {
    let queue = [tree];
    const lists = [];
    while (queue.length) {
        // go through each node at the queue and make list
        // once done, get left+right nodes from each node and add to queue (empty it first);
        let list = queue.map((treeNode) => ({ value: treeNode.value, next: null }));
        list.forEach((node, index) => {
            node.next = list[index + 1] || null;
        });
        lists.push(list[0]);

        const newQueue = []
        queue.forEach(({ left, right }) => {
            if (left) {
                newQueue.push(left);
            }
            if (right) {
                newQueue.push(right);
            }
        });

        queue = newQueue;
    }

    return lists;
}
describe('list of depth', () => {
    it('should make list', () => {
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

        const lists = listOfDepth(node4);
        expect(lists[0].value).to.equal(4);
        expect(lists[0].next).to.equal(null);

        expect(lists[1].value).to.equal(2);
        expect(lists[1].next.value).to.equal(6);
        expect(lists[1].next.next).to.equal(null);

        expect(lists[2].value).to.equal(1);
        expect(lists[2].next.value).to.equal(3);
        expect(lists[2].next.next.value).to.equal(5);
        expect(lists[2].next.next.next.value).to.equal(7);
    });
});