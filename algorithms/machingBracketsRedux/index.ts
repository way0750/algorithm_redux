// You're given a string consisting solely of (, ), and *. * can represent either a (, ), or an empty string. Determine whether the parentheses are balanced.

// For example, (()* and (*) are balanced. )*( is not balanced.

/**
 * solution: like the usual bracket matching function, use a stack to keep track of how many left side you have ran into so far
 * but each time you run into a * or right side bracket, pop one out.
 * but in case of something like: (*) you will run into having a right side bracket left over.
 * so how about keep track of how * have so far matched with left side bracket?
 * Each time if a right bracket is encountered, reduce the * count, if it is zero then pop from stack
 */

export function bracketMatch(str) {
  const leftBracketsStack = [];
  let wildMatchCount = 0;
  const leftBrackets = {
    '(': '(',
    '{': '{',
    '[': '[',
    '"': '"' 
  };
  const rightBracketMatch = {
    ')': '(',
    '}': '{',
    '[': ']',
    '"': '"'
  };
  for(let i = 0; i < str.length; i++) {
    const curChar = str[i];
    if (leftBrackets[curChar]) {
      leftBracketsStack.push(curChar);
    } else if (curChar === '*') {
      wildMatchCount++;
      if (leftBracketsStack.length) {
        leftBracketsStack.pop();
      }
    } else if (rightBracketMatch[curChar]) {
      if (wildMatchCount) {
        wildMatchCount--;
      } else {
        const leftSideBracketMatch = leftBracketsStack.pop() || '';
        const leftSideBracketMatch2 = rightBracketMatch[curChar];
        if (leftSideBracketMatch !== leftSideBracketMatch2) {
          return false;
        }
      }
    }
  }

  return leftBracketsStack.length ? false : true;
}

describe('matching brackets redux', () => {
  it('should work for empty string', () => {
    const bracketStr = '';
    const result = bracketMatch(bracketStr);
    expect(result).to.equal(true);
  });
  it('should work for (*)', () => {
    const bracketStr = '(*)';
    const result = bracketMatch(bracketStr);
    expect(result).to.equal(true);
  });
  it('should work for (**)', () => {
    const bracketStr = '(**)';
    const result = bracketMatch(bracketStr);
    expect(result).to.equal(true);
  });
  it('should work for ((*********))', () => {
    const bracketStr = '((*********))';
    const result = bracketMatch(bracketStr);
    expect(result).to.equal(true);
  });
  it('should work for ((*********))}', () => {
    const bracketStr = '((*********))}';
    const result = bracketMatch(bracketStr);
    expect(result).to.equal(true);
  });
  it('should for (*)}', () => {
    const bracketStr = '(*)}';
    const result = bracketMatch(bracketStr);
    expect(result).to.equal(false);
  });
  it('should work for (*)}}', () => {
    const bracketStr = '(*)}}';
    const result = bracketMatch(bracketStr);
    expect(result).to.equal(false);
  });
  it('should work for (*}', () => {
    const bracketStr = '(*}';
    const result = bracketMatch(bracketStr);
    expect(result).to.equal(false);
  });
});