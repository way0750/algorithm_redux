/**
 * Problem:

Given the root of a binary tree, check whether it is a mirror of
itself (i.e., symmetric around its center).

For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

markdown

    1
   / \
  2   2
 / \ / \
3  4 4  3

But the following [1,2,2,null,3,null,3] is not:

markdown

    1
   / \
  2   2
   \   \
   3    3

Write a function isSymmetric(root) that takes the root node of a binary tree,
and returns a boolean representing whether the tree is symmetric.

Consider the function signature as below (you can adjust to fit your preferred language):

javascript

function isSymmetric(root) {
    // your code here
}

Note: Bonus points if you could solve it both recursively and iteratively.

just compare each level from both directions

to solve it with recursion:
    pass next level to the call
    base case:
        if all nodes are null, return true;
        if null amount if odd, return false;
        if not mirror, return false;
    how to make problem smaller:
        just get all the current nodes' children, and put them in an array and recursively call
        with that array
    what to always return:
        boolean
    what to do with return:
        just return it
 */

export function isSymmetricRecursive(root) {
    const nodes = (root || { value: null, left: null, right: null }).constructor === Array ? root : [root];
    let nullCount = 0;
    for (let leftIndex = 0; leftIndex < nodes.length/2; leftIndex++) {
        const rightIndex = nodes.length - 1 - leftIndex;
        const leftNode = nodes[leftIndex] || { value: null };
        const rightNode = nodes[rightIndex] || { value: null };
        if (leftNode.value !== rightNode.value) return false;
        if (leftNode.value === null) nullCount++;
        if (rightNode.value === null) nullCount++;
    }
    if (nullCount === nodes.length) return true;
    const nextLevel = nodes.reduce((arr, node) => {
        const leftChild = (node || { left: null }).left;
        const rightChild = (node || { right: null }).right;
        return [...arr, leftChild, rightChild]
    }, []);
    return isSymmetricRecursive(nextLevel);
}

function isSymmetricIteractive(root) {
    let curLevel = [root];
    let nullCount;
    while (curLevel.length) {
        nullCount = 0;
        for (let leftIndex = 0; leftIndex < curLevel.length/2; leftIndex++) {
            const rightIndex = curLevel.length - 1 - leftIndex;
            const leftNode = curLevel[leftIndex] || { value: null };
            const rightNode = curLevel[rightIndex] || { value: null };
            if (leftNode.value !== rightNode.value) return false;
            if (leftNode.value === null) nullCount++;
            if (rightNode.value === null) nullCount++;
        }
        if (nullCount === curLevel.length) return true;
        curLevel = curLevel.reduce((arr, node) => {
            const leftChild = (node || { left: null }).left;
            const rightChild = (node || { right: null }).right;
            return [...arr, leftChild, rightChild]
        }, []);
    }
    return true;
}

describe('test', () => {
    it('should test', () => {
        const node1 =  { value: 1, left: null, right: null };
        const node2 =  { value: 2, left: null, right: null };
        const node22 = { value: 2, left: null, right: null };
        const node3 =  { value: 3, left: null, right: null };
        const node33 = { value: 3, left: null, right: null };
        const node4 =  { value: 4, left: null, right: null };
        const node44 = { value: 4, left: null, right: null };
        node1.left = node2;
        node1.right = node22;
        node2.left = node3;
        node2.right = node4;
        node22.left = node44;
        node22.right = node33
        expect(isSymmetricRecursive(null)).to.equal(true);
    });
});