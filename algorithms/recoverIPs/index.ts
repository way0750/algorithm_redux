import { getMaxListeners } from "cluster";

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
  while (strSlicingCount <= Math.min(3, numStr.length)) {
    const curNumStr = numStr.slice(0, strSlicingCount)
    const curNum = Number(numStr ? curNumStr : NaN);
    let remainingNum = numStr.slice(strSlicingCount);
    let isEnoughtNumLeft = remainingNum.length >= minStrLength && remainingNum.length <= maxStrLength;
    const isCurNumWithinRange = curNum > -1 && curNum < 256;
    if (isCurNumWithinRange && remainingNum.length === 0 && !minStrLength && !maxStrLength) {
      patterns.push(`${curNumStr}`);
    } else if (isCurNumWithinRange && isEnoughtNumLeft) {
      let subPatterns = findAllIPs(remainingNum, minStrLength - 1, maxStrLength - 3);
      subPatterns = subPatterns.map((subPattern) => `${curNumStr}.${subPattern}`);
      patterns.push(...subPatterns);
    }
    strSlicingCount++;
  }
  return patterns;
}

describe('recover all IPs', () => {
  it('should return for the test example above', () => {
    const numStr = "25525511135";
    const expectedReturn = ["255.255.11.135", "255.255.111.35"];
    expect(findAllIPs(numStr)).to.deep.equal(expectedReturn);
  });
  it('should return the right amount', () => {
    const numStr = "255255255255";
    const expectedReturn = ["255.255.255.255"];
    expect(findAllIPs(numStr)).to.deep.equal(expectedReturn);
  });
  it('should return the right amount too', () => {
    const numStr = "101010101";
    const expectedReturn = [
      "1.01.010.101",
      "1.010.10.101",
      "1.010.101.01",
      "10.1.010.101",
      "10.10.10.101",
      "10.10.101.01",
      "10.101.0.101",
      "10.101.01.01",
      "10.101.010.1",
      "101.0.10.101",
      "101.0.101.01",
      "101.01.0.101",
      "101.01.01.01",
      "101.01.010.1",
      "101.010.1.01",
      "101.010.10.1",
    ];

    expect(findAllIPs(numStr)).to.deep.equal(expectedReturn);
  });
  it('should return empty array for super long string ', () => {
    const numStr = "255255111351212121212";
    const expectedReturn = [];
    expect(findAllIPs(numStr)).to.deep.equal(expectedReturn);
  });
  it('should return empty array for string that is too short', () => {
    const numStr = "251";
    const expectedReturn = [];
    expect(findAllIPs(numStr)).to.deep.equal(expectedReturn);
  });
  it('should return empty array for no possible IP found', () => {
    const numStr = "999999999999";
    const expectedReturn = [];
    expect(findAllIPs(numStr)).to.deep.equal(expectedReturn);
  });
});