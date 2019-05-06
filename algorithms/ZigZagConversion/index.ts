/**
 * The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)
 * https://leetcode.com/problems/zigzag-conversion/
 * 
 * solution 1, basically creating the zig zag lines by looping in cycle 
 * from 0..line count
 * the trick is how do you do this cycle looping
 * you can do this: set curLineNum to 0 and lines to [];
 * loop from 0 ... lineCount and default set direction flag to downward
 * so when it's downward and curLineNum is less than 4 then add to lines
 * then lineCount++;
 * when it's larger than 4 then linCount -= 2 to go back two step because zigzag
 * and then insert number to line
 * set direction to upward
 * and lineCount--
 * 
 * then when it's going up
 * at the beginning of each loop check and see if lineCount < 0
 * if yes, then lineCount += 2
 * enter number to line
 * then set direction to downward
 * and lineCount++
 * 
 * at the end just map and concat everything from the lines into one huge string
 * and return;
 * 
 * time and space:
 * time:
 * looping through all char: n
 * depends on if the string data structure is mutable or not
 *   if yes: then time is n
 *   if no: then worst case can be n**2
 * 
 * space:
 * final line is same size as input
 * and the temp array will hold the same space as input
 * so n
 */

export function zigzagConversion(str, lineCount) {
  let downward = true;
  let curLineNum = 0;
  const lines = [];
  for(let i = 0; i < str.length; i++) {
    const curChar = str[i];
    if (curLineNum >= lineCount) {
      curLineNum -= 2;
      downward = false;
    } else if (curLineNum < 0) {
      curLineNum += 2;
      downward = true;
    }

    lines[curLineNum] = lines[curLineNum] || [];
    lines[curLineNum].push(curChar);

    downward ? curLineNum++ : curLineNum--;
  }

  return lines.reduce((finalLine, arr) => {
    return finalLine += arr.join('');
  }, '');
}

describe('zig zag', () => {
  it('should PAYPALISHIRING return PAHNAPLSIIGYIR', () => {
    const str = 'PAYPALISHIRING';
    const expected = 'PAHNAPLSIIGYIR';
    expect(zigzagConversion(str, 3)).to.equal(expected);
  });
  it('should PAYPALISHIRING return PAHNAPLSIIGYIR', () => {
    const str = 'PAYPALISHIRING';
    const expected = 'PINALSIGYAHRPI';
    expect(zigzagConversion(str, 4)).to.equal(expected);
  });
});