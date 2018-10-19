/**
 * give a string consisted of brackets, return true if all are matching correctly
 * ex: ({[[]]}){[[]]}{} returns true
 * ex: {{[[]]}}} returns false
 * 
 * solution:
 * maintain a stack of left side brackets, then whenever running into a right side bracket, check and see if both match each other
 * the most recently closing bracket has to match with the most recent opening opening bracket in the stack
 */

function isMatchingBracket(str: string): boolean {
  const stack = [];
  const closingBrackets = {
    ")": "(",
    "]": "[",
    "}": "{"
  }
  for(let i = 0; i < str.length; i++) {
    const char = str[i];
    if (closingBrackets[char]) {
      // most recent opening bracket
      const openingBracket = stack[stack.length - 1] || '';
      if (closingBrackets[char] === openingBracket) {
        stack.pop();
      } else {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return true;
}

describe('Matching brackets', () => {
  it('should work with example', () => {
    const str = "({[[]]}){[[]]}{}";
    expect(isMatchingBracket(str)).to.be.true;
  });

  it('should return false', () => {
    const str = "}({[[]]}){[[]]}{}";
    expect(isMatchingBracket(str)).to.be.false;
  });
});