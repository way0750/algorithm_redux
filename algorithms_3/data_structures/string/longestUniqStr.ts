/**
 * Problem Statement:
    Given a string, find the length of the longest substring without repeating characters.

    Example 1:

    plaintext

    Input: "abcabcbb"
    Output: 3 
    Explanation: The answer is "abc", with the length of 3.

    well keep two pointers one slow and one fast
    the fast one keeps on moving forward, keep on adding char to the char count hash
    but when any char has a count of > 1
    compare to global uniq sub string count and update if need to
        then keep moving the slow one forward until the count of char that the fast pointer
        pointing to is === 1
    
    return the global uniq sub string length count
 */

export function longestUniqSubString(str) {
    let uniqSubLength = 0;
    if (!str.length) return uniqSubLength;
    let slow = 0;
    let fast = 1;
    let charFreq = { [str[slow]]: 1 };
    while (fast < str.length) {
        const curFastChar = str[fast];
        charFreq[curFastChar] = charFreq[curFastChar] || 0;
        charFreq[curFastChar]++;
        if (charFreq[curFastChar] > 1 || fast === str.length-1) {
            // time to move the slow pointer forward
            uniqSubLength = Math.max(uniqSubLength, fast - slow);
            while (charFreq[curFastChar] > 1) {
                let curSlowChar = str[slow];
                charFreq[curSlowChar]--;
                slow++
            }
        }
        fast++;
    }

    return uniqSubLength;
}

describe('should return the longest sub string', () => {
    it('should return 3', () => {
        const str = 'abcabcbb';
        expect(longestUniqSubString(str)).to.equal(3);
    });

    it('should return 1', () => {
        const str = 'bbbbb';
        expect(longestUniqSubString(str)).to.equal(1);
    });

    it('should return 1', () => {
        const str = 'pwwkew';
        expect(longestUniqSubString(str)).to.equal(3);
    });
});