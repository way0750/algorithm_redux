/**
 * Given a string of parentheses, find the balanced string that can be produced from it
 * using the minimum number of insertions and deletions. If there are multiple solutions, return any of them.
 * For example, given "(()", you could return "(())". Given "))()(", you could return "()()()()".
 * 
 * set leftParentCount to keep track of left parentheses.
 * set finalString to empty string;
 * loop through the input string, and check each character:
 *   if char is '(' then add it to the finalString
 *   if char is ')'
 *     and if leftParentCount is > 0, then reduce it by 1 and enter ')' to finalString
 *     and if leftParentCount is === 0, then enter '()' to finalString
 *  
 *   at the end check leftParentCount, and add same amount of ')' to finalString
 *  
 *   return finalString;
 */

export function makeBalanceString(str: string): string {
  let leftParentCount = 0;
  let finalString = '';
  for (let index = 0; index < str.length; index++) {
    const curChar = str[index];
    if (curChar === '(') {
      finalString += curChar;
      leftParentCount++;
    } else if (curChar === ')') {
      if (leftParentCount) {
        leftParentCount--;
        finalString += curChar;
      } else {
        finalString += '()';
      }
    }
  }

  finalString += ')'.repeat(leftParentCount);
  return finalString;
}

describe('Test makeBalanceString', () => {
  it('Should return correctly for the example', () => {
    const str = "(()"; 
    const expectedReturn = "(())";
    expect(makeBalanceString(str)).to.equal(expectedReturn);
  });
  it('Should return correctly for the example', () => {
    const str = "))()(";
    const expectedReturn = "()()()()";
    expect(makeBalanceString(str)).to.equal(expectedReturn);
  });
  it('Should return empty string for empty string input', () => {
    const str = ""
    const expectedReturn = "";
    expect(makeBalanceString(str)).to.equal(expectedReturn);
  });
  it('Should return ()()()()() string for )))))', () => {
    const str = ")))))"
    const expectedReturn = "()()()()()";
    expect(makeBalanceString(str)).to.equal(expectedReturn);
  });
  it('Should return ()()()()() string for ()()()()()', () => {
    const str = "()()()()()"
    const expectedReturn = "()()()()()";
    expect(makeBalanceString(str)).to.equal(expectedReturn);
  });
  it('Should return ((((())))) string for ((((())))', () => {
    const str = "((((())))"
    const expectedReturn = "((((()))))";
    expect(makeBalanceString(str)).to.equal(expectedReturn);
  });
});