/**
 *  For two strings s and t, we say "t divides s" if and only if s = t + t + t + ... + t + t (i.e., t
 * is concatenated with itself one or more times).

    Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

    

    Example 1:

    Input: str1 = "ABCABC", str2 = "ABC"
    Output: "ABC"
    Example 2:

    Input: str1 = "ABABAB", str2 = "ABAB"
    Output: "AB"
    Example 3:

    Input: str1 = "LEET", str2 = "CODE"
    Output: ""
    

    Constraints:

    1 <= str1.length, str2.length <= 1000
    str1 and str2 consist of English uppercase letters.
 */

var isDivisible = (str, n) => {
    const compStr = str.slice(0, n);
    for (let i = 0; i < str.length; i += n) {
        const nextCompStr = str.slice(i, i + n);
        if (compStr !== nextCompStr) return false;
    }
    return true;
};
export var gcdOfStrings = function(str1, str2) {
    let length = Math.min(str1.length, str2.length);
    while (length) {
        const str1Divisible = str1.length % length === 0;
        const str2Divisible = str2.length % length === 0;
        if (str1Divisible && str2Divisible) {
            // now check if the substring is even the divisor
            const str1StrDivisible = isDivisible(str1, length);
            const str2StrDivisible = isDivisible(str2, length);
            const sameSubStr = str1.slice(0, length) === str2.slice(0, length);
            if (str1StrDivisible && str2StrDivisible && sameSubStr) {
                return str1.slice(0, length);
            }
        }
        length--;
    }
    return '';
};

describe('test', () => {
    it('works', () => {
        const str1 = "LEET";
        const str2 = "CODE";
        const result = gcdOfStrings(str1, str2);
        expect(result).to.equal('');
    });
});
