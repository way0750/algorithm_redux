export function getTreeLevels (tree, level = 0, breadthArr = []) {
    breadthArr[level] = breadthArr[level] || [];
    breadthArr[level].push(tree.value);

    if (tree.left) getTreeLevels(tree.left, level + 1, breadthArr);
    if (tree.right) getTreeLevels(tree.right, level + 1, breadthArr);

    return breadthArr;
}

function getKSmallestNode(tree, k) {
    function search (tree) { 
        if (!tree) return null;
        const leftVal = search(tree.left);
        if (leftVal) return leftVal;
        k--;
        if (k === 0) return tree;
        return search(tree.right);
    }
    return search(tree);
}


describe('', () => {
    it('', () => {
        const node1 = { val: 1, left: null, right: null };
        const node2 = { val: 2, left: null, right: null };
        const node3 = { val: 3, left: null, right: null };
        const node4 = { val: 4, left: null, right: null };
        const node5 = { val: 5, left: null, right: null };
        const node6 = { val: 6, left: null, right: null };
        const node7 = { val: 7, left: null, right: null };
        node4.left = node2
        node4.right = node6;
        node2.left = node1;
        node2.right = node3;
        node6.left = node5;
        node6.right = node7;
        expect(getKSmallestNode(node4, 2).val).to.equal(2);
    });
});

function maxSubArrOfK (arr, k) {
    const maxLength = Math.max(arr.length, k);
    let curSum = 0;
    let curMax = 0;
    let backI = 0
    for (let frontI = 0; frontI < maxLength; frontI++) {
        const num = arr[frontI];
        curSum += num;
        if ((frontI - backI + 1) > k) {
            curSum -= arr[backI];
            backI++;
        }
        curMax = Math.max(curSum, curMax);
    }
    return curMax;
}

describe('', () => {
    it('', () => {
        const array = [100, 200, 300, 400];
        const k = 2;
        expect(maxSubArrOfK(array, k)).to.equal(700);
    })
})

function maxSumToLeaf (tree) {
    let curMax = 0;
    function search(tree) {
        if (!tree) return 0;
        const leftReturn = search(tree.left);
        const rightReturn = search(tree.right);
        curMax = Math.max(
            tree.value + leftReturn + rightReturn,
            curMax
        );
        return Math.max(tree.value + leftReturn, tree.value + rightReturn);
    }
    return search(tree);
}