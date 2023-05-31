/**
    You are given a binary tree where each node can either store a pointer to the left child node, the right child node, and an additional random node which can point to any node in the tree. Clone this given binary tree.
    The Node class for the binary tree could be something like this:

    class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.random = null;
    }
    }

    You need to implement the following function:

    function cloneBinaryTreeWithRandomPointer(root) {
    // your implementation here
    }

    This function should take the root of the original binary tree as input and return the root of the cloned binary tree as output. The cloned binary tree should be a deep copy of the original tree, i.e., any change to the original tree after cloning should not reflect in the cloned tree.
    also:
    values are not unique
    multiple nodes can refer to the same random node


    if it was just left and right child, it would have been easily to deal with nodes pointer reference
    by using recursion

    but because of the random node pointer, things get more challenging

    solution:
    modify the input tree by adding unique identifier to each node:
    ex: 1:1 means level 1 node 1 from the left
    2:4 means level 2 node 4 from the left

    after done adding unique identifiers to each node
    then go through each node and copy all the values
    and put the new node in a hash table for ease of reference later:
    {
        1:1: { value, left, right, random }
    }

    then go through each node and read the left right and random pointer from original tree
    and use that to connect all the new cloned nodes
 */

function cloneBinaryTreeWithRandomPointer(root) {
    let queue = [root];
    let level = 0;
    // make sure to update the left, right, and random node pointers!
    const nodeHash = {};
    const allOldNodes = [];
    while (queue.length) {
        const newQueue = [];
        queue.forEach((node, index) => {
            node.id = `${level}:${index}`;
            nodeHash[node.id] = {...node};
            if (node.left) {
                newQueue.push(node.left);
            }
            if (node.right) {
                newQueue.push(node.right);
            }
        });
        level++;
        allOldNodes.push(...queue);
        queue = newQueue;
    }

    allOldNodes.forEach((oldNode) => {
        const clonedNode = nodeHash[oldNode.id];
        const oldNodeLeft = (oldNode.left || { id: null }).id;
        const oldNodeRight = (oldNode.right || { id: null }).id;
        const oldNodeRandom = (oldNode.random || { id: null }).id;
        clonedNode.left = nodeHash[oldNodeLeft];
        clonedNode.right = nodeHash[oldNodeRight];
        clonedNode.random = nodeHash[oldNodeRandom];
    });

    const clonedTreeHead = nodeHash['0:0'];
    allOldNodes.forEach((oldNode) => {
        const clonedNode = nodeHash[oldNode.id];
        delete oldNode.id;
        delete clonedNode.id;
    });

    return clonedTreeHead;
}

describe('deep clone tree', () => {
    it('should deep clone', () => {
        const node1 = { value: 1, left: null, right: null, random: null };
        const node2 = { value: 2, left: null, right: null, random: null };
        const node3 = { value: 3, left: null, right: null, random: null };
        node2.left = node1;
        node2.right = node3;
        node3.random = node1;

        const newTree = cloneBinaryTreeWithRandomPointer(node2);
        expect(newTree.left).to.not.equal(node2.left);
        expect(newTree.left.value).to.equal(node2.left.value);
        expect(newTree.right.random.value).to.equal(node2.right.random.value);
    });
});
