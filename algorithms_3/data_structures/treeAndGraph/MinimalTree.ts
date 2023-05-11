/**
 * Minimal Tree: Given a sorted (increasing order) array with unique integer elements,
 * write an algorithm to create a binary search tree with minimal height.
 * just recursive call with sub array to build sub search tree
 * 
 * base case: arr is empty, return null
 * what to always do with return:
 *      if called with left sub array, then just assigned the return value to left child
 *      same with right sub array
 * what to always return: a node, which is the top node of the sub tree. could be null too
 * how to break the problem smaller:
 *      get element at mid index, that the value for current node
 *      then use the mid index to slice the array into left sub array and right sub array
 * 
 * time: O(logN), space: O(N);
 */

export function makeBinarySearchTree (arr) {
    if (!arr.length) {
        return null;
    }
    const midIndex = Math.floor(arr.length/2);
    const leftSubArray = arr.slice(0, midIndex);
    const rightSubArray = arr.slice(midIndex+1);
    return {
        value: arr[midIndex],
        left: makeBinarySearchTree(leftSubArray),
        right: makeBinarySearchTree(rightSubArray),
    };
}

describe('make binary search tree', () => {
    it('should make tree with 1,2,3,4,5,6,7', () => {
        const arr = [1,2,3,4,5,6,7];
        const tree = makeBinarySearchTree(arr);
        expect(tree.value).to.equal(4);
        expect(tree.left.value).to.equal(2);
        expect(tree.left.left.value).to.equal(1);
        expect(tree.left.right.value).to.equal(3);

        expect(tree.right.value).to.equal(6);
        expect(tree.right.left.value).to.equal(5);
        expect(tree.right.right.value).to.equal(7);
    });
});