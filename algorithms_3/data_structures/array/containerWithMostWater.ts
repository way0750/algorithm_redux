export function maxArea (heights) {
    const lineRecs = heights.map((height, originalIndex) => {
        return { height, originalIndex };
    }).sort((a, b) => {
        return a.height - b.height;
    });
    const indexesSortByHeight = lineRecs.map(({ originalIndex }) => originalIndex);
    let curMax = -Infinity;
    lineRecs.forEach(({ height, originalIndex }, index) => {
        const dist = Math.abs(Math.max(...indexesSortByHeight.slice(index + 1)) - originalIndex);
        const curMaxVol = height * dist;
        if (height === 7) {
            debugger;
        }
        curMax = Math.max(curMaxVol, curMax);
    });
    return curMax;
}

describe('tst', () => {
    it('sould work', () => {
        const height = [1,8,6,2,5,4,8,3,7];
        expect(maxArea(height)).to.equal(49);
    })
})