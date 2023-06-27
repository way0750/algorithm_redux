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

/**
 * set a stack, and always only add new char to the last item in the stack
 * if running into a (
 *  push that curret sub string into a stack
 * if running into a latter, append it to current sub string
 * if running into a )
 *      reverse the current sub string
 *      then append it to the most recent sub string in stack
 *      
 */

function reverseInParentheses(str) {
    const stack = [];
    let curSubStr = '';
    for (let i = 0; i <= str.length; i++) {
        const char = str[i];
        if (i === str.length) {
            return curSubStr;
        } else if (char === '(') {
            stack.push(curSubStr);
            curSubStr = '';
        } else if (char === ')') {
            curSubStr = curSubStr.split('').reverse().join('');
            let lastSubStr = stack.pop() || '';
            lastSubStr += curSubStr;
            curSubStr = lastSubStr;
        } else {
            curSubStr += char;
        }
    }
    return ''
}

describe('sub', () => {
    it('sub', () => {
        const str = "(u(noi(rst)s)an)";
        expect(reverseInParentheses(str)).to.equal('');
    });
})