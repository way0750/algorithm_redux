export function threeNumberSum(nums, target) {
    const hash = {};
    const uniqNums = nums.filter((num) => {
        if (hash[num]) return false;
        hash[num] = true;
        return true;
    });
    const sortedNums = uniqNums.sort((a, b) => a - b);
    const allPatterns = [];
    for (let i = 0; i < sortedNums.length - 2; i++) {
        const curNum = sortedNums[i];
        const patterns = [];
        const pairSearchHash = {};
        const newTarget = target - curNum;
        for (let j = i + 1; j < sortedNums.length; j++) {
            const subNum = sortedNums[j];
            if (pairSearchHash.hasOwnProperty(subNum)) {
                patterns.push([curNum, pairSearchHash[subNum], subNum]);
            } else {
                pairSearchHash[newTarget - subNum] = subNum;
            }
        }

        allPatterns.push(...patterns);
    }
    return allPatterns;
}

describe('test', () => {
    it('test', () => {
        const val = threeNumberSum([12, 3, 1, 2, -6, 5, -8, 6], 0);
        expect(val).to.equal([]);
    });
});