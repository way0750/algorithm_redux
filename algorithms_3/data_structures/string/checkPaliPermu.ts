/**
 * Palindrome Permutation: Given a string, write a function to check if it is a
 * permutation of a palin- drome. A palindrome is a word or phrase that is the same forwards
 * and backwards. A permutation is a rearrangement of letters.The palindrome does not need to be
 * limited to just dictionary words.
 * 
 * one way to define a palindrome is that there are same amount of frequency of each characters
 * on left and right, so 2X each unique chars, but that one char right in the middle can be the only
 * one that has an odd frequency.
 * so keep track all charcterss frequencies and then see how many characters has odd frequency.
 * if less than 2 ( 0 or 1) that is true, else that's false
 */

export function checkPaliPermu(str) {
    const freq = {};
    for (let i = 0; i < str.length; i++) {
        const char = str[i].toLowerCase();
        if (/[a-z]/.test(char)) {
            freq[char] = freq[char] || 0;
            freq[char]++;
        }
    }

    const freqNums = Object.values(freq);
    let oddFreq = 0;
    freqNums.forEach((num: number) => {
        if (num % 2 == 1) {
            oddFreq++;
        }
    })
    return oddFreq < 2;
}
/**
 * time: O(n the length of str), space: O(n);
 */

describe('test', () => {
    it('should return true', () => {
        const str = "Tact Coa";
        expect(checkPaliPermu(str)).to.equal(true);
    });
    it('should return false', () => {
        const str = "Tact Coak";
        expect(checkPaliPermu(str)).to.equal(false);
    });
    it('should return true', () => {
        const str = "Tact Cooa";
        expect(checkPaliPermu(str)).to.equal(true);
    });
});