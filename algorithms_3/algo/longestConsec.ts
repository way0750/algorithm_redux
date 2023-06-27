export function longest (nums) {
    const rec = nums.reduce((obj, n) => {
        obj[n] = 1;
        return obj;
    }, {});
    let curMax = 0;
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        let curSubLength = rec[num];
        while (rec[num+1]) {
            num++;
            curSubLength += rec[num];
        }
        curMax = Math.max(curMax, curSubLength);
    }
    return curMax;
}

describe('', () => {
    it('', () => {
        const nums =  [100, 4, 200, 1, 3, 2];
        expect(longest(nums)).to.equal(4);
    })
})