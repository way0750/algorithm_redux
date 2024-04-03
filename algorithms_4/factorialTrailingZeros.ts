/**
 * 172. Factorial Trailing Zeroes
Medium
Topics
Companies
Given an integer n, return the number of trailing zeroes in n!.

Note that n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1.

 

Example 1:

Input: n = 3
Output: 0
Explanation: 3! = 6, no trailing zero.
Example 2:

Input: n = 5
Output: 1
Explanation: 5! = 120, one trailing zero.
Example 3:

Input: n = 0
Output: 0
 

Constraints:

0 <= n <= 104
5 4 3 2 1
5 * 2 = 10
120
6 5 4 3 2 1
720
7 6 5 4 3 2 1
5040
8.....1
40320
*/

export const trailingZeroes = (n) => {
    return Math.floor(n/5);
}

const getFac = (n) => {
    let prod = 1;
    while (n) {
        prod *= (n--);
    }
    return prod;
}

const myPow = (x, n) => {
    if (n === 0) return 1;
    if (n === 1) return x;
    const absPow = Math.abs(n);
    const isNegative = n < 0;
    const evenP = Math.floor(absPow/2);
    const singleP = absPow % 2;
    const prod = myPow(x, evenP);
    const result = prod * prod * myPow(x, singleP);
    return isNegative ? 1 / result : result
}

const searchMatrix001 = (matrix, target) => {
    // find the row
    let minRow = 0;
    let maxRow = matrix.length;
    let targetRow;
    while (minRow < maxRow && !targetRow) {
        const midRow = minRow + Math.floor((maxRow-minRow)/2); 
        console.log(minRow, midRow, maxRow);
        const midRowStart = matrix[midRow][0];
        const midRowEnd = matrix[midRow][matrix[0].length-1];
        if (target >= midRowStart && target <= midRowEnd) {
            targetRow = matrix[midRow];
        } else if (target < midRowStart) {
            maxRow = midRow;
        } else {
            minRow = midRow + 1;
        }
    }
    if (!targetRow) {
        return false;
    }
    // fine the target within the targetRow
    let min = 0;
    let max = targetRow.length;
    while (min < max) {
        console.log(new Date());
        const mid = min + Math.floor((max-min)/2);
        if (targetRow[mid] === target) {
            return true;
        } else if (targetRow[mid] > target) {
            max = mid;
        } else {
            min = mid + 1;
        }
    }

    return false;
};

const searchMatrix = (matrix, target) => {
    let min = 0;
    const rowLength = matrix[0].length;
    let max = matrix.length * rowLength;
    while (min < max) {
        const mid = min + Math.floor((max-min)/2);
        const rowIndex = Math.floor(mid / rowLength);
        const eleIndex = mid % rowLength;
        const midEle = matrix[rowIndex][eleIndex];
        if (midEle === target) {
            return true;
        } else if (midEle < target) {
            min = mid + 1;
        } else {
            max = mid;
        }
    }
    return false;
}

const removeDuplicates = (arr) => {
    let back = 0;
    arr.forEach((n, front) => {
        if (n !== arr[back]) {
            arr[front] = arr[back];
            arr[back] = n;
        }
        if (arr[back] !== arr[back-1] || arr[back] !== arr[back-2]) {
            back++;
        }
    });
    return arr;
}

const longestConsecutive002 = (nums) => {
    const cache = nums.reduce((obj, n) => {
        obj[n] = obj[n] || 1;
        return obj;
    }, {});
    let curMax = 0;
    for (var record in cache) {
        let nextNum = +record + 1;
        while(cache[nextNum]) {
            console.log(cache)
            cache[record] += cache[nextNum];
            delete cache[nextNum];
            nextNum = +record + cache[record];
        }
        curMax = Math.max(curMax, cache[record]);
    }
    return curMax;
}

const longestConsecutive = (nums) => {
    nums.sort((a, b) => a-b);
    let max = 0;
    let curMax = 0;
    for (let index = 0; index <= nums.length; index++) {
        const n = nums[index];
        const diff = n-nums[index-1];
        if (diff <= 1) {
            curMax += diff;
        } else {
            max = Math.max(max, curMax);
            curMax = 1;
        }
    }
    return max;
}

const insert = (intervals, newInterval) => {
    intervals.push(newInterval);
    intervals.sort((a, b) => a[0] - b[0]);
    const results = [];
    if (intervals.length) results.push(intervals[0]);
    for (let i = 1; i < intervals.length; i++) {
        const interval = intervals[i];
        const preInterval = results[results.length-1];
        if (interval[0] <= preInterval[1]) {
            preInterval[1] = Math.max(interval[1], preInterval[1]);
        } else {
            results.push(interval);
        }
    }
    return results;
}

/**
 * @param {string[]} tokens
 * @return {number}
 */
const mathOps = { '+': true, '-': true, '*': true, '/': true };
var evalRPN = function(tokens) {
    const stack = [];
    tokens.forEach((token) => {
        if (mathOps[token]) {
            const n2 = stack.pop();
            const n1 = stack.pop();
            if (token === '+') {
                stack.push(n1 + n2);
            } else if (token === '-') {
                stack.push(n1 - n2);
            } else if (token === '*') {
                stack.push(n1 * n2);
            } else {
                stack.push((n1 / n2));
            }
        } else {
            stack.push(+token);
        }
        console.log(stack)
    });
    return stack[0];
};

const copyRandomList = (head) => {
    const arr = [];
    let curOgNode = head;
    while (curOgNode) {
        curOgNode.id = arr.length;
        const cpNode = {...curOgNode};
        arr.push(cpNode);
        curOgNode = curOgNode.next;
    }

    curOgNode = head;
    arr.forEach((node, index) => {
        node.next = arr[index+1];
        node.random = node.random === null ? null : arr[node.random.id];
    });

    return arr[0];
}

describe('test', () => {
    it('should do fact', () => {
        const node7 = {val: 7, next: null, random: null };
        const node13 = {val: 13, next: null, random: null };
        const node11 = {val: 11, next: null, random: null };
        const node10 = {val: 10, next: null, random: null };
        const node1 = {val: 1, next: null, random: null };
        node7.next = node13;
        node13.next = node11;
        node11.next = node10;
        node10.next = node1;

        node13.random = node7;
        node11.random = node1;
        node10.random = node11;
        node1.random = node7;

        const head = copyRandomList(node7);

        expect(head).to.equal([])
    });
});
