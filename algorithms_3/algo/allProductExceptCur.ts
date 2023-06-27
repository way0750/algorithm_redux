/**
 * 1 2 3 4 5
 * 
 * 
    0    2 3 4 5
    1  1   3 4 5
    2  1 2   4 5
    3  1 2 3   5
    4  1 2 3 4  

    for each index, do math twice
    set a cur product = previous accumulative product * num on the left
 */

export function allProd(nums) {
    let accuProd1 = 1;
    const prods = nums.map((num, index) => {
        const prevNum = index === 0 ? 1 : nums[index-1];
        return accuProd1 *= prevNum;
    });

    let accuProd2 = 1;
    for (let i = nums.length - 1; i > -1 ; i--) {
        const rightNum = i === nums.length - 1 ? 1 : nums[i+1];
        accuProd2 *= rightNum;
        prods[i] *= accuProd2;
    }

    return prods;
}

xdescribe('test', () => {
    it('', () => {
        const nums = [1, 2, 3, 4, 5];
        expect(allProd(nums)).to.equal([]);
    })
});

function getUniqsPairs(nums, target) {
    const cache = {};
    const uniqPairs = [];
    nums.forEach((num) => {
        if (cache.hasOwnProperty(num) && cache[num]) {
            cache[num] = false; // false for being used already
            uniqPairs.push([target - num, num]);
        } else if (!cache.hasOwnProperty(num)) {
            cache[target - num] = true;
        }
    });
    return uniqPairs;
}
xdescribe('', () => {
    it('', () => {
        const nums = [1,1,1,2,2,2];
        const target = 3;
        expect(getUniqsPairs(nums, target)).to.equal([])
    });
});


function getFirstUniqChar(str) {
    const freqCache = {} // { char: { freq: 99, node: node } }
    let linkedList = null;
    let tailNode = null;
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (!freqCache[char]) {
            freqCache[char] = { freq: 1, node: { i, prev: null, next: null } };
        } else {
            freqCache[char].freq++;
        }

        const { node } = freqCache[char];
        if (freqCache[char].freq > 1) {
            // remove it from the linked list
            if (!node.prev) {
                linkedList = node.next;
                (node.next || { prev: null }).prev = null;
            } else if (node === tailNode) {
                node.prev.next = null;
                tailNode = node.prev;
            } else {
                node.prev.next = node.next;
                node.next.prev = node.prev;
            }
            node.prev = null;
            node.next = null;
        } else if (freqCache[char].freq === 1) {
            // first time node
            if (!linkedList) {
                linkedList = node;
            } else if (!tailNode){
                linkedList.next = node;
                node.prev = linkedList;
                tailNode = node;
            } else {
                tailNode.next = node;
                node.prev = tailNode;
                tailNode = node;
            }
        }
    }

    return linkedList ? linkedList.i : -1;
}

xdescribe('', () => {
    it('', () => {
        const str = 'klajsdkfljaklsdjfklajsdklfjaklsjdfkljasdlkjfklajsdfkljalksdjfklajsdflkjalksdjflkajsdflkjalksdjflkajsdflkjalskdfjlakjsdfkjasldjflkajsdflkjakfjdklajsdlkfjkl4';
        expect(getFirstUniqChar(str)).to.equal(str.length - 1);
    });
});

function decodeStr(str) {
    let count = '';
    let output = '';
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (/\d/.test(char)) {
            count += char;
        } else {
            output += char.repeat(+count);
            count = '';
        }
    }
    return output;
}

xdescribe('', () => {
    it('', () => {
        expect(decodeStr('4A3B2C1D2A')).to.equal('AAAABBBCCDAA');
    })
});

function getAna(arr) {
    let strRecs = arr.map((str, i) => {
        const chars = str.split('').sort();
        return { chars, i };
    });
    strRecs = strRecs.sort((a, b) => {
        return a.chars.length - b.chars.length;
    });
    const groups = {};
    strRecs.forEach((strRec) => {
        const key = strRec.chars.toString();
        groups[key] = groups[key] || [];
        groups[key].push(strRec.i);
    });
    const anas = [];
    for (let key in groups) {
        if (groups[key].length > 1) {
            anas.push(groups[key]);
        }
    }

    return anas;
}

xdescribe('', () => {
    it('', () => {
        const arr = [  "cat",  "dog",  "god",  "tca"];
        expect(getAna(arr)).to.equal([]);
    })
});

function getSeq(nums) {
    let curRec = [];
    let back = 0;
    for (let front = 1 ; front <= nums.length; front++) {
        const num = nums[front];
        if (front === nums.length || Math.abs(num - nums[front-1]) !== 1) {
            const newSeq = nums.slice(back, front);
            if (newSeq.length > curRec.length) curRec = newSeq;
            back = front;
        }
    }
    return curRec;
}

describe('', () => {
    it('', () => {
        const nums = [1, 2, 3, 1, 2, 3, 4, 1, 2, 3, 4, 5];
        expect(getSeq(nums)).to.equal([])
    })
})