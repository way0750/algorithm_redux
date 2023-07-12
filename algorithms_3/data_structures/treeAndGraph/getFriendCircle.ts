/**
 * loop from 0 to n
 * when finding a node that hasn't been visited, that's one friend circle
 * maintain a hash for recording which node has been visited
 * do a breath first search to find all the friends circle
 */

export function getFriendCircle(matrix) {
    const isVisited = {};
    let friendCircleCount = 0;
    for (let personI = 0; personI < matrix.length; personI++) {
        if (!isVisited[personI]) {
            friendCircleCount++;
            isVisited[personI] = true;
            let friends = [personI];
            while (friends.length) {
                const nextLevelOfFriends = [];
                friends.forEach((friendI) => {
                    const friendList = matrix[friendI];
                    friendList.forEach((isFriend, personI) => {
                        if (isFriend && !isVisited[personI]) {
                            isVisited[personI] = true;
                            nextLevelOfFriends.push(personI);
                        }
                    });
                });
                friends = nextLevelOfFriends;
            }
        }
    }
    return friendCircleCount;
}

describe('', () => {
    it('', () => {
        // const matrix = [[1,1,0],[1,1,1],[0,1,1]];
        const matrix = [[1,1,0],[1,1,0],[0,0,1]];
        expect(getFriendCircle(matrix)).to.equal(2);
    })
});

/**
 * 
 * visited: {1: true} to avoid having the main loop going through it again
 * accessCount: { 1: 3 }
 */

function hasCircle(n, edges) {
    const graph = {};
    edges.forEach(([from, to]) => {
        graph[from] = graph[from] || [];
        graph[from].push(to);
    });
    for (let node = 0; node < n; node++) {
        // do a breadth first search and update the access count hash
        let curLevel = [node];
        const accessCount = {};
        while (curLevel.length) {
            const newLevel = [];
            for (let i = 0; i < curLevel.length; i++) {
                const node = curLevel[i];
                accessCount[node] = accessCount[node] || 0;
                accessCount[node]++;
                if (accessCount[node] > 1) return true;
                newLevel.push(...graph[node]);
            }
            curLevel = newLevel;
        }
    }
    return false;
}

describe('', () => {
    it('', () => {
        const edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]];
        const n = 5;
        expect(hasCircle(n, edges)).to.equal(true);
    })
})



function romanToInteger (str) {
    const r2d = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000,
        '': 0,
    };
    let num = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const nextChar = str[i+1] || '';
        let curNum = r2d[char];
        const nextNum = r2d[nextChar];
        curNum *= (curNum < nextNum ? -1 : 1);
        num += curNum;
    }
    return num
}


function checkBrackets(str) {
    const stack = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (/\(|\[|\{/.test(char)) {
            stack.push(char);
        } else {
            const matchingChar = stack.pop();
            const pair = matchingChar+char;
            if (!/\(\)|\[\]|\{\}/.test(pair)) {
                return false
            };
        }
    }
    return !stack.length;
}

xdescribe('', () => {
    it('', () => {
        const str = '((([[]]{}{})))';
        const nums = [5,5,5,15];
        expect(checkBrackets(str)).to.equal(true);
    });
});

function longestSubStrOfK(str, k) {
    let backI = 0;
    let freq = {};
    let curMax = 0;
    let uniqCharCount = 0;
    for (let frontI = 0; frontI < str.length; frontI++) {
        const char = str[frontI];
        freq[char] = freq[char] || 0;
        freq[char]++
        if (freq[char] === 1) uniqCharCount++
        if (uniqCharCount === k) curMax = Math.max(curMax, frontI - backI + 1);
        if (uniqCharCount > k) {
            // move the backI forward, reduce freq and uniqCharcount here:
            while (uniqCharCount > k) {
                const backChar = str[backI];
                freq[backChar]--;
                if (freq[backChar] === 0) uniqCharCount--;
                backI++
            }
        }
    }
    return curMax;
}

xdescribe('', () => {
    it('', () => {
        const str = "araaci";
        expect(longestSubStrOfK(str, 3)).to.equal(4)
    });
})

function swapZero(nums) {
    let zeroI = nums.findIndex((n) => n === 0);
    for (let frontI = zeroI + 1; frontI < nums.length; frontI++) {
        const n = nums[frontI];
        if (n !== 0) {
            nums[zeroI] = n;
            nums[frontI] = 0;
            zeroI++;
        }
    }
    return nums;
}

xdescribe('', () => {
    it('', () => {
        const nums = [0, 1, 0, 3, 12];
        expect(swapZero(nums)).to.equal([1,3,12,0,0])
    })
})

function longestConsec(nums) {
    const rec = nums.reduce((obj, num) => {
        obj[num] = 1;
        return obj;
    }, {});
    let curMax = 0;
    nums.forEach((num) => {
        let seq = num;
        let length = 1;
        while (rec[++seq]) {
            seq;
            length += rec[seq];
            rec[seq] = 0;
        }
        curMax = Math.max(curMax, length);
    });
    return curMax;
}

describe('', () => {
    it('', () => {
        const nums = [100, 4, 200, 1, 3, 2];
        expect(longestConsec(nums)).to.equal(4);
    });
})