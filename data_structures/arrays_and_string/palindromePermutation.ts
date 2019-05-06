/**
 * Palindrome Permutation: Given a string, write a function to check if it is a permutation of
 * a palindrome. A palindrome is a word or phrase that is the same forwards and backwards. 
 * A permutation is a rearrangement of letters.The palindrome does not need to be limited to just dictionary words.
  EXAMPLE
  Input: Tact Coa
  Output: True (permutations: "taco cat". "atco cta". etc.)

  solution 1:
 * for a string to be rearranged into a palindrome, you just need to make sure
 * that the amount of characters that have odd count is 1 or 0
 * so set a oddCharCount and initialized to 0
 * set a record to {}
 * then go through each char and increase its count in record first
 * then check its frequency count
 *   if it is even then reduce oddCharCount by 1
 *   else increase it by 1
 * 
 * time and space
 * time: you have to go through each character in the string so n for the string
 * length
 * 
 * space: worse case you end up with all unique chars so..... n again
 */

export function palindromePermutation(str) {
  let oddCharCount = 0;
  const frequencyRecord = {};
  for (let i = 0; i < str.length; i++) {
    const curChar = str[i].toLowerCase();
    frequencyRecord[curChar] = frequencyRecord[curChar] || 0;
    frequencyRecord[curChar]++;
    const charNumVal = curChar.charCodeAt();
    if (frequencyRecord[curChar] % 2 === 0) {
      oddCharCount--;
    } else if (charNumVal > 96 && charNumVal < 123) {
      oddCharCount++;
    }
  }

  return oddCharCount < 2;
}

describe('lalindrome permutation', () => {
  it('should return true for "aaabbbb"', () => {
    const str = 'aaabbbb';
    expect(palindromePermutation(str)).to.be.true;
  });
  it('should return false for "aaabbb"', () => {
    const str = 'aaabbb';
    expect(palindromePermutation(str)).to.be.false;
  });
  it('should return true for "Tact Coa"', () => {
    const str = 'Tact Coa';
    expect(palindromePermutation(str)).to.be.true;
  });
});