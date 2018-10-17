// Given a string containing only digits, restore it by returning all possible valid IP address combinations.
// Example:
// Input: "25525511135"
// Output: ["255.255.11.135", "255.255.111.35"]

/**
 * There will be reusable sub patterns, so use cache?
 * And at the same time, you have to get all possible valid IP addresses, so use recursion to find all?
 * 
 * the interesting twist here is that at each section of the IP, there can only 1 to 3 numbers 
 * so if the input is 9123456789123, there are 13 numbers, so you can't create a valid IP
 * also, the max numeric value of each section is 0...255
 * what if it contains 0?
 *   IP address might not be allowed to start with 0
 *   does that matter?
 * 
 * solution 1:
 * loop through the string and take numbers from 1 to 3 digits to create 1 section of an IP
 * it is a valid section if: the remaning string can create the right amount of sections 
 *   ex: after taking 1 digit, we still need to create 3 sections, meaning we need between 3 to 9 numbers
 *     less than 3 or more than 9 meanings taking 1 digit for this section will work
 * it is a valid section if: the section number is between 0 and 255
 * if it is a valid section, then recursively call with remaing string, with the stack number too so we know
 *   how to check the length required for making sub sections
 * 
 * prepend current section to each of the returned pattern
 * take more digit as new a number for this section
 * 
 * 
 * the recursion setup:
 * recursive case: if remaining string is between the passed in min and max length
 *   and if the current section num is between 0, 255
 * what to return always: an array of possible strings
 * what to do with return, add current section num to each string's front
 * how to make problem smaller:
 *   recursively call with remaing string and new min (curMin - 1) and max length (curMax - 3)
 */

export function findAllIPs(numStr: string, minStrLength: number = 3, maxStrLength: number = 9): Array<string> {
  let patterns = [];
  let strSlicingCount = 1;
  while (strSlicingCount < 4) {
    const curNum = Number(numStr.slice(0, strSlicingCount));
    let remainingNum = numStr.slice(strSlicingCount);
    let isEnoughtNumLeft = remainingNum.length >= minStrLength && remainingNum.length <= maxStrLength;
    if (curNum > -1 && curNum < 256 && isEnoughtNumLeft) {
      let subPatterns = findAllIPs(remainingNum, minStrLength - 1, maxStrLength - 3);
      subPatterns = subPatterns.map((subPattern) => `${curNum}.${subPattern}`);
      patterns.push(...subPatterns);
    }
    strSlicingCount++;
  }
  return patterns;
}