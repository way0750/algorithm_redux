/**
 * just have 3 nested loops, each loop 1 index less
 * to essentially turn the problem into finding a pair of numbers
 * that can sum up to some number
 */

export function getQuadruplets(nums, target) {
    if (nums.length < 4) return [];
    const foundQuad = [];
    for (let a = 0; a < nums.length - 3; a++) {
        const firstNum = nums[a];
        const target2Lvl = target - firstNum;
        let foundTriplets = [];
        for (let b = a + 1; b < nums.length - 2; b++) {
            const secondNum = nums[b];
            const target3Lvl = target2Lvl - secondNum;
            const pairHash = {};
            let foundPairs = [];
            for (let c = b + 1; c < nums.length; c++) {
                const thirdNum = nums[c];
                const seekingNum = target3Lvl - thirdNum;
                if (pairHash.hasOwnProperty(seekingNum)) {
                    foundPairs.push([seekingNum, thirdNum]);
                    delete pairHash[seekingNum]; 
                } else {
                    pairHash[thirdNum] = true;
                }
            }
            foundPairs = foundPairs.map((pair) => [secondNum, ...pair]);
            if (foundPairs.length) foundTriplets.push(...foundPairs);
        }
        foundTriplets = foundTriplets.map((triplets) => {
            return [firstNum, ...triplets].sort((a, b) => a - b)
        });
        foundQuad.push(...foundTriplets);
    }

    return foundQuad;
}

describe('test', () => {
    it('should work', () => {
        const nums =  [1, 0, -1, 0, -2, 2];
        const target = 0;
        const result = getQuadruplets(nums, target);
        expect(result).to.equal([]);
    });
});