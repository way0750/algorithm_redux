/**
 * Is Unique:
 * Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?
 * 
 * solution 1:
 * create a record (hash) to keep track of the each char's frequency
 * then loop through the input string 1 char at the time and check if it is
 * already in the record. if yes that means that char is repeated, which case
 * you should return false for: this string is not unique
 * if the char is not found in the record, then add it as the key with value of
 * true as: "found once so far"
 * 
 * then if all chars are unique then just default to true for, yes all chars are
 * unique in this string
 */

export function isUnique(string) {
  const frequencyRecord = {};
  for (let i = 0; i < string.length; i++) {
    const curChar = string[i];
    if (frequencyRecord[curChar]) {
      return false;
    } else {
      frequencyRecord[curChar] = true;
    }
  }

  return true;
}

describe('isUnique', () => {
  it('should return true for abcde', () => {
    const str = 'abcde';
    expect(isUnique(str)).to.be.true
  });
  it('should return false for abcdea', () => {
    const str = 'abcdea';
    expect(isUnique(str)).to.be.false
  });
  it('should return true for empty string', () => {
    const str = '';
    expect(isUnique(str)).to.be.true
  });
});