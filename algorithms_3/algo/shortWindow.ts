/**
 * Problem
    Write a function minWindow in JavaScript that takes two strings, s and t, and
    returns the minimum window in s which will contain all the characters in t.
    If there is no such window in s that covers all characters in t, return an empty string.
Input:

s = "ADOBECODEBANC", t = "ABC"

Output:

"BANC"

Explanation:

The minimal window in s that contains all the characters in t is "BANC".

Note:

If there is such window in s that covers all characters in t, return the minimum such window.
If there is such window that is the same size, return the first one you find.

Function Signature:

function minWindow(s: string, t: string): string {}

This problem tests your understanding of string manipulation and sliding window techniques.
 */

// compare if reach property in recB is at least >= of the same property in recA
function recComp (recA, recB) {
    const chars = Object.keys(recA);
    return chars.every((key) => recB[key] >= recA[key]);
}

export function minWindow(s, t) {
    const tRec = t.toLowerCase().split('').reduce((rec, c) => {
        rec[c] = rec[c] || 0;
        rec[c]++;
        return rec;
    }, {});
    let minLength = Infinity;
    const ls = s.toLowerCase();
    const sRec = {};
    let slowI = -1;
    for (let i = 0; i < ls.length; i++) {
        const char = ls[i];
        sRec[char] = sRec[char] || 0;
        sRec[char]++;
        if (recComp(tRec, sRec)) {
            minLength = Math.min(minLength, i - slowI);
            while (recComp(tRec, sRec)) {
                minLength = Math.min(minLength, i - slowI);
                slowI++;
                sRec[ls[slowI]]--;
            }
        }
    }

    return minLength;
}

describe('test', () => {
    it('should work', () => {
        const s = "ADOBECODEBANC";
        const t = "ABC";
        expect(minWindow(s, t)).to.equal(4);
    });
})

function twoSum(nums, target) {
    const hash = {};
    for(let i = 0; i < nums.length; i++) {
        const n = nums[i];
        if (hash.hasOwnProperty(n)) {
            return [hash[n], n];
        } else {
            hash[target - n] = n;
        }
    };
    return [];
}

function longestPath(nums) {
    const hash = nums.reduce((obj, n) => {
        obj[n] = 1;
        return obj;
    }, {});
    let length = 0;
    nums.forEach((n) => {
        let curNum = n;
        let curLength = 0;
        while (hash[curNum]) {
            hash[curNum] = 0;
            curLength++
            curNum++;
        }
        hash[n] = curLength;
        length = Math.max(length, curLength);
    });

    return length;
}

function checkBracket(s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (/\{|\(|\[/.test(char)) {
            stack.push(char);
        } else {
            const pair = stack.pop() + char;
            if (/\[\]|\(\)|\{\}/.test(pair) === false) {
                return false
            }
        }
    }
    return !stack.length;
}

describe('should check brackets', () => {
    it('should work', () => {
        const input = "{[]}";
        expect(checkBracket(input)).to.be.equal(true);
    })
})

function inorderTraversal (root) {
    if (!root) return [];
    return [...inorderTraversal(root.left), root.value, ...inorderTraversal(root.right)];
}

function findSingleNum(nums) {
    nums.forEach((num) => {
        const index = num - 1;
        nums[index] = nums[index] + 0.1;
    });

    let n = nums.find((num) => {
        if (num !== undefined) {
            return +(num - Math.floor(num)).toPrecision(1) === 0.1;
        }
    });
    return Math.floor(n);
}

describe('test single num', () => {
    it('should work', () => {
        const nums = [4,1,2,1,2];
        expect(findSingleNum(nums)).to.equal(4);
    });
})

function getInterval(nums, target) {
    function biSearch(getStart) {
        let start = 0;
        let end = nums.length - 1;
        while (start <= end) {
            console.log(start, end)
            const mid = start + Math.floor((end - start)/2);
            const midVal = nums[mid];
            if (midVal === target) {
                if (getStart && nums[mid-1] === target) {
                    end = mid-1;
                } else if (!getStart && nums[mid+1] === target) {
                    start = mid+1;
                } else {
                    return mid;
                }
            } else {
                if (midVal < target) {
                    start = mid + 1;
                } else if (midVal > target) {
                    end = mid - 1;
                }
            }
        }
        return -1;
    }

    const start = biSearch(true);
    return start === -1 ? [-1, -1] : [start, biSearch(false)];
}

describe('quick test', () => {
    it('sould work', () => {
        const nums = [5, 7, 7, 8, 8, 10];
        const target = 6;
        expect(getInterval(nums, target)).to.equal([-1, -1]);
    });
});