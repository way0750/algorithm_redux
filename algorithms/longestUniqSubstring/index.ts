
/*
Given a string, find the length of the longest substring without repeating characters.

Example 1:

Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3. 
Example 2:

Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
Note that the answer must be a substring, "pwke" is a subsequence and not a
substring.
*/

/**
 * @param {string} s
 * @return {number}
 have a cache keeping tracking of character frequency within current interval
 have two pointers: A and B
 A keeps on moving forward and adding characters to cache and increment the character
   frequency. Once the frequency is > 1 stop, and set a flag: foundRepeatChar to true
 whenever foundRepeatChar is true, move B and reduce frequency count of current char by 1, whenever the value is still 1 after reducing, that means we have reduce the only repeated char so far in this B..A interval, set foundRepeaetChar to false so A can move again
 */

function lengthOfLongestSubstring(s) {
  let A = -1;
  let B = -1;
  let curMax = 0;
  let cache = {};
  let repeatedChar = '';
  while(A < s.length - 1) {
      let curChar;
      if (repeatedChar) {
          B++
          curChar = s[B];
          // reduce the frequency by 1
          cache[curChar]--;
          // get ride of the only repeat char
          if (repeatedChar === curChar) {
              repeatedChar = '';
          }
      } else {
          A++;
          curChar = s[A] || '';
          cache[curChar] = cache[curChar] || 0;
          cache[curChar]++;
          // found one char
          if (cache[curChar] > 1) {
              repeatedChar = curChar;
          } else {
              curMax = Math.max(A-B, curMax);
          }
      }
  }
  return curMax;
};

describe('longest unique sub string', () => {
  it('should work with example above:', () => {
    const str = 'abcabcbb';
    expect(lengthOfLongestSubstring(str)).to.eql(3);
  });
  it('should work with bbbbbabcds', () => {
    const str = 'bbbbbabcds';
    expect(lengthOfLongestSubstring(str)).to.eql(5);
  });
  it('should work with alksdjflajbbbbweresdfkljaksdljfwoeiuroiwer', () => {
    const str = 'alksdjflajbbbbweresdfkljaksdljfwoeiuroiwer';
    expect(lengthOfLongestSubstring(str)).to.eql(13);
  });
});