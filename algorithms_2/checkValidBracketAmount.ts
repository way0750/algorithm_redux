import { count } from "../algorithms_1/allUniqueSteps/main";

/**
 * input a string and return the amount of valid bracket or paren pairs
 * this is valid: 'al(skd) [jf]'
 * this is not valid '([)]
 * basically all bracket or parens have to pair up conventionally correct
 * 
 * use a stack to enforce order of valid closing paren or bracket
 * loop through the string
 *   each time you find an opening bracket, push it into the stack
 *   or whenever you run into a closing one, then pop one from the stack
 *   and check if they can compliment each.
 *   if yes, then increase global count
 *   if not, return -1 for find invalid bracket
 */

export function getBracketAmount(str) {
  const brackStack = [];
  const openBrackets = { '(': '(', '[': '[' };
  const closingBrackets = { ')': '(', ']': '[' };
  let bracketCount = 0;
  for (let i = 0; i < str.length; i++) {
    const curChar = str[i];
    if (openBrackets[curChar]) {
      brackStack.push(curChar);
      if (brackStack.length > str.length / 2) {
        // gone over half of the size
        return -1
      }
    } else if (closingBrackets[curChar]) {
      // pop and combine and check
      const opening = brackStack.pop();
      const pair = `${opening}${curChar}`;
      const isValidPair = pair === '()' || pair === '[]';
      if (isValidPair) {
        bracketCount++;
      } else {
        return -1;
      }
    }
  }

  return brackStack.length ? -1 : bracketCount;
}

describe('count valid bracket', () => {
  it('001', () => {
    const str = '(())[]';
    expect(getBracketAmount(str)).to.eql(3);
  });
  it('002', () => {
    const str = '((())[]';
    expect(getBracketAmount(str)).to.eql(-1);
  });
  it('003', () => {
    const str = '(((hey)))[]';
    expect(getBracketAmount(str)).to.eql(4);
  });
  it('004', () => {
    const str = '(((((((((((';
    expect(getBracketAmount(str)).to.eql(-1);
  });
  it('005', () => {
    const str = ''
    expect(getBracketAmount(str)).to.eql(0);
  });
});