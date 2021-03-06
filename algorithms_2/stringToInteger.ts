/*
  Implement atoi which converts a string to an integer.

  The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.

  The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.

  If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.

  If no valid conversion could be performed, a zero value is returned.

  Note:

  Only the space character ' ' is considered as whitespace character.
  Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. If the numerical value is out of the range of representable values, INT_MAX (231 − 1) or INT_MIN (−231) is returned.
  Example 1:

  Input: "42"
  Output: 42
  Example 2:

  Input: "   -42"
  Output: -42
  Explanation: The first non-whitespace character is '-', which is the minus sign.
              Then take as many numerical digits as possible, which gets 42.
  Example 3:

  Input: "4193 with words"
  Output: 4193
  Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.
  Example 4:

  Input: "words and 987"
  Output: 0
  Explanation: The first non-whitespace character is 'w', which is not a numerical 
              digit or a +/- sign. Therefore no valid conversion could be performed.
  Example 5:

  Input: "-91283472332"
  Output: -2147483648
  Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer.
              Thefore INT_MIN (−231) is returned.


  solution 1:
  
  '    -12345'
  anytime run into a non(- or 0-9) char return 0 (no number found)
  what about space?
    no space allow once parsing starts
  once parsing starts, any none (- or 0-9) will end the parsing

  so....
  white space allow from the beginning, and only white space and -/0-9 is allowed
  once -/0-9 is found, number parsing starts
    should keep count of the - there can only be one
    each loop add digit and compare current number to the global max and min
  once end of string or none -/0-9 is found parsing ends

  time and space:
  time: loop once so N, but adding to string.... it can n**2 depending on the
  language
  if dynamic string then N, if string is not mutable then n**2 because
  creating new string by coping all existing chars

  space: worst case it is the same as the input string
*/

const GLOBAL_MIN = -2147483648;
const GLOBAL_MAX = 2147483648;

const strToNum = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9
};

export function myAtoi(str) {
  let parsingInProgress = false;
  let curNum = 0;
  let multiplier = 10;
  let negation = false;
  for (let i = 0; i <= str.length; i++) {
    const curChar = str[i];
    if (parsingInProgress) {
      // stop here dur find a invalid char after the parsing started
      if (!/[\d]/.test(curChar)) {
        // there might a chance that str is just simply '-'
        curNum = negation ? curNum * -1 : curNum;
        return curNum === -0 ? 0 : curNum;
      } else {
        curNum *= multiplier;
        curNum += strToNum[curChar];
      }

      // check if the num is within range
      if (curNum > GLOBAL_MAX) {
        return negation ? GLOBAL_MIN : GLOBAL_MAX;
      }
    } else {
      // parsing hasn't even start yet running to invalid char
      // return 0
      if (!/[\s\d-+]/.test(curChar)) {
        return 0;
      } else if (/[\d-+]/.test(curChar)) {
        // legit char, add it to the curNumStr and
        // switch parsingInProgress to true
        // also, this is the only place where a - is counted as a 
        // valid char
        parsingInProgress = true;
        if (/[-\+]/.test(curChar)) {
          negation = curChar === '-';
        } else {
          curNum += strToNum[curChar];
        }
      }
    } 
  }

  return 0;
}

describe('String To Integer', () => {
  it('Should return 0 for empty string', () => {
    const str = '';
    expect(myAtoi(str)).to.eql(0);
  });
  it('Should return 0 for "-"', () => {
    const str = '-';
    expect(myAtoi(str)).to.eql(0);
  });
  it('Should return 1 for "1"', () => {
    const str = '1';
    expect(myAtoi(str)).to.eql(1);
  });
  it('Should return 42 for "42"', () => {
    const str = '42';
    expect(myAtoi(str)).to.eql(42);
  });
  it('Should handle leading spaces', () => {
    const str = '       -1';
    expect(myAtoi(str)).to.eql(-1);
  });
  it('Should handle invalid leading chars', () => {
    const str = 'a       -1';
    expect(myAtoi(str)).to.eql(0);
  });
  it('Should stop when invalid char found after parsing starts', () => {
    const str = '       -12345    a';
    expect(myAtoi(str)).to.eql(-12345);
  });
  it('Should return 0 if - is by itself', () => {
    const str = '       - 12345    a';
    expect(myAtoi(str)).to.eql(0);
  });
  it('Should return 1 for +1', () => {
    const str = '+1';
    expect(myAtoi(str)).to.eql(1);
  });
  it('Should only return global min or max if out of range', () => {
    let str = '-2147483648';
    expect(myAtoi(str)).to.eql(-2147483648);

    str = '2147483648';
    expect(myAtoi(str)).to.eql(2147483648);
  });
});
