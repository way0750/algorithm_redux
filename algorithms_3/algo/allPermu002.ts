/**
 * Challenge:
You're given a string of digits. Write a function to compute the number of all possible
letter combinations that the number could represent, using the mapping of digits to
letters on the buttons of a typical mobile phone.

For reference, here's the mapping:
2: 'abc'
3: 'def'
4: 'ghi'
5: 'jkl'
6: 'mno'
7: 'pqrs'
8: 'tuv'
9: 'wxyz'

Function Signature: function countCombinations(digits: string): number {}

For instance, given the digits "23", there are 9 possible combinations:
'ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'. Therefore, your function
should return 9 for input "23".
 */

export function countCombinations(str) { 
    if (!str) return 0
    let count = 1;
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        count *= char === 7 || char === 9 ? 4 : 3;
    }
    return count;
}
describe('', () => {
    it('', () => {
        const str = '23';
        expect(countCombinations(str)).to.equal(9);
    });
});
