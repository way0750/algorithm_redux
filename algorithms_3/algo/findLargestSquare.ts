/**
 * You are given a function findLargestSquare(n, arr) where n is the size of a
 * square 2D array arr and arr consists of only 0s and 1s. The function
 * should find the size of the largest square in the array that consists of only 1s.

Function Signature: function findLargestSquare(n, arr) { }

Input:

    n: An integer denoting the size of the 2D array, 1 ≤ n ≤ 1000.
    arr: A 2D array of integers where each integer is either a 0 or 1.

Output:
Return a single integer denoting the side length of the largest square of 1s in the given 2D
array. If there are no 1s, return 0.

Example:

js

findLargestSquare(4, [[0, 1, 1, 0], [1, 1, 1, 1], [0, 1, 1, 1], [0, 1, 1, 1]]);

Output:

js

3

Explanation:
The largest square of 1s in the 2D array is of size 3x3 which starts from the 2nd row
and 2nd column (index starting from 1).



just loop from the bottom right to top left and update each cell with the max possible
square at that index by 1 + min of right,right bottom, bottom

 */

export function findLargestSquare(n, arr) {
    let curMax = 0;
    const sqrtRec = arr.map((row) => Array(row.length).fill(0));
    for (let rowIndex = n - 1; rowIndex >= 0; rowIndex--) {
        for (let colIndex = n - 1; colIndex >= 0; colIndex--) {
            if (arr[rowIndex][colIndex] === 1) {
                const rightVal = colIndex+1 === n ? 0 : sqrtRec[rowIndex][colIndex+1];
                const bottomVal = rowIndex+1 === n ? 0 : sqrtRec[rowIndex+1][colIndex];
                const rightBottomVal = (colIndex+1 === n) || (rowIndex+1 === n)
                    ? 0
                    : sqrtRec[rowIndex+1][colIndex+1];
                const sqrtSizeAtIndex = 1 + Math.min(rightVal, bottomVal, rightBottomVal);
                sqrtRec[rowIndex][colIndex] = sqrtSizeAtIndex;
                curMax = Math.max(curMax, sqrtSizeAtIndex);
            }
        }
    }
    return curMax;
}

xdescribe('', () => {
    it('', () => {
        const val = findLargestSquare(4, [[0, 1, 1, 0], [1, 1, 1, 1], [0, 1, 1, 1], [0, 1, 1, 1]]);
        expect(val).to.equal(3);
    });
});

function isPalindrome(str) {
    let leftIndex = 0;
    let rightIndex = str.length - 1;
    while (leftIndex < rightIndex) {
        const leftChar = str[leftIndex].toLowerCase();
        const rightChar = str[rightIndex].toLowerCase();
        if (/\w/.test(leftChar) && /\w/.test(rightChar)) {
            if (leftChar !== rightChar) return false;
            leftIndex++;
            rightIndex--;
        } else {
            if (!/\w/.test(leftChar)) {
                leftIndex++;
            }
            if (!/\w/.test(rightChar)) {
                rightIndex--;
            }
        }
    }
    return true;
}

describe('', () => {
    it('', () => {
        const val = isPalindrome("A man a plan a canal Panama!!!");
        expect(val).to.equal(true);
    });
});


/**
 * recursive case:
 *      target - current house weight > 0
 * what to always return:
 *      integer, the total value possible from the sub array
 * what to do with return:
 *      current house value + return
 *      VS
 *      only the return value
 *      then return which ever is the largest
 * how to make problem smaller:
 *      recursively call with
 *      1: target - current house value, and slice the array
 *      2: target as it is, and slice the array
 */

function robbery(items, weight) {
    if (!items.length) return 0;
    const subArr = items.slice(1);
    const valWithoutCurHouse = robbery(subArr, weight);
    let valWithCurHouse = 0;
    if (weight - items[0].w > 0 ) {
        valWithCurHouse = items[0].v + robbery(subArr, weight - items[0].w);
    }
    return Math.max(valWithoutCurHouse, valWithCurHouse);
}

xdescribe('', () => {
    it('', () => {
        const items = [{v: 60, w: 10}, {v: 100, w: 20}, {v: 120, w: 30}];
        const w = 50;
        expect(robbery(items, w)).to.equal(220);
    });
});


function subarrayEqualToK (nums, k) {
    let curSum = 0;
    let backI = 0;
    let sumCount = 0;
    for (let frontI = 0; frontI < nums.length; frontI++) {
        curSum += nums[frontI];
        if (curSum === k) {
            sumCount++;
        } else if (curSum > k) {
            while (curSum > k) {
                curSum -= nums[backI];
                if (curSum === k) sumCount++;
                backI++;
            }
        }
    }
    return sumCount;
}

describe('', () => {
    it('', () => {
        const nums = [10, 2, -2, -20, 10];
        const k = -10;
        expect(subarrayEqualToK(nums, k)).to.equal(2);
    })
});

function maxProduct(nums) {
    if (!nums.length) return 0;
    
    let maxProduct = nums[0];
    let minProduct = nums[0];
    let result = nums[0];

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < 0) {
            let temp = maxProduct;
            maxProduct = minProduct;
            minProduct = temp;
        }

        maxProduct = Math.max(nums[i], maxProduct * nums[i]);
        minProduct = Math.min(nums[i], minProduct * nums[i]);
        result = Math.max(result, maxProduct);
    }

    return result;
}

xdescribe('', () => {
    it('', () => {
        const n = [1,2,0,5,0,9,9];
        expect(maxProduct(n)).to.equal(0);
    });
});

function reverseListRecursive(curNode, preNode = null) {
    if (!curNode) return preNode;
    const oldNextNode = curNode.next;
    curNode.next = preNode;
    return reverseListRecursive(oldNextNode, curNode);
}

function reverseList(head) {
    let preNode = null;
    let curNode = head;
    while (curNode) {
        const oldNextNode = curNode.next;
        curNode.next = preNode;
        preNode = curNode;
        curNode = oldNextNode;
    }

    return preNode;
}

describe('reverseList', () => {
    it('reverseList 001', () => {
        const node1 = { val: 1, next: null };
        const node2 = { val: 2, next: null };
        const node3 = { val: 3, next: null };
        const node4 = { val: 4, next: null };
        const node5 = { val: 5, next: null };
        node1.next = node2;
        node2.next = node3;
        node3.next = node4;
        node4.next = node5;

        expect(reverseList(node1).val).to.equal(5);
    })
})

function isBalanced (tree) {
    if (!tree) return true;
    let curLevel = [tree];
    let inPerfectLelcount = 0;
    let curLevelRank = 0;
    while (inPerfectLelcount < 2 && curLevel.length) {
        if (curLevel.length !== 2**curLevelRank) inPerfectLelcount++
        if (inPerfectLelcount > 1) return false;
        const newLevel = [];
        curLevel.forEach((node) => {
            if (node.left) newLevel.push(node.left);
            if (node.right) newLevel.push(node.right);
        });
        curLevel = newLevel;
        curLevelRank++
    }
    return true;
}

describe('check balance', () => {
    it('simple one', () => {
        const node1 = { val: 1, left: null, right: null };
        const node2 = { val: 2, left: null, right: null };
        const node3 = { val: 3, left: null, right: null };
        const node4 = { val: 4, left: null, right: null };
        const node5 = { val: 5, left: null, right: null };
        node1.left = node2;
        node1.right = node3;
        node2.left = node4;
        node2.right = node5;
        const result = isBalanced(node1);
        expect(result).to.equal(true);
    })
})

function getMaxHeight(tree) {
    if (!tree) return 0;
    return Math.max(getMaxHeight(tree.left), getMaxHeight(tree.right)) + 1;
}