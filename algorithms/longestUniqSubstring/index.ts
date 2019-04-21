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
let lengthOfLongestSubstring = function(s) {
  let foundRepeatChar = false;
  let A = 0;
  let B = -1;
  let curMax = 0;
  let cache = {};
  while(A <= s.length) {
      let curChar;
      if (foundRepeatChar) {
          curChar = s[B];
          // reduce the frequency by 1
          cache[curChar]--;
          // get ride of the only repeat char
          if (cache[curChar] === 1) {
              foundRepeatChar = false;
          } else {
              B++;
          }
      } else {
          curMax = Math.max(A-B, curMax);
          curChar = s[A] || '';
          cache[curChar] = cache[curChar] || 0;
          cache[curChar]++;
          if (cache[curChar] > 1) {
              foundRepeatChar = true;
          } else {
              A++;
          }
      }
  }
  return curMax;
};