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
        list = list.map((node, index) => ({ ...node, next: list[index+1] }));
        lists.push(list);
        const newQueue = []
        queue.forEach((node) => {
            newQueue.push(node.left, node.right);
        });
        queue = newQueue;
    }

    return lists;
}
