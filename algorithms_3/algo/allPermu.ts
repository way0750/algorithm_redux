/**
 * get all permutation of a set of unique chars
 * abc:
 * [a], then add b to each possible index: [[ba], [ab]]
 * [[cba], [bca], [bac], [cab], [acb], [abc]]
 */

export function getAllPermutations (str) {
    if (str.length === 0) return [];
    let allPermus = [str[0]];
    for (let i = 1; i < str.length; i++) {
        const curChar = str[i];
        const newPermus = [];
        allPermus.forEach((permuStr) => {
            // add current char to each position
            for ( let j = 0; j <= permuStr.length; j++) {
                newPermus.push(permuStr.slice(0, j) + curChar + permuStr.slice(j));
            }
        });
        allPermus = newPermus;
    }

    return allPermus;
}

describe('get all permutation', () => {
    it('should get abc', () => {
        const str = 'ab';
        expect(getAllPermutations(str).length).to.equal([]);
    });
    // 1 = 1,
    // 2 = 2,
    // 3 = 6,
    // 4 = 24,
    // 5 = 120
    // 1 * 2 * 3 * 4 * 5
    // str.legnth!
});