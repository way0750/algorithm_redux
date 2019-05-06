/**
 * Check Permutation: Given two strings, write a method to decide if one is a permutation of the other.
 * 
 */

/**
 * Permutation of one string is basically a rearrangement of all the characters
 * from the same string. So to check if two strings are permutation of each
 * other, you can just need to see if both string contains the same amount of
 * characters and each unique character has same frequency
 * 
 * solution 1:
 *  if the two strings are not the same length, return false, either one of the
 *  strings have different set of unique chars or the unique chars are of
 *  different frequency
 * 
 *  else:
 *  go through one string and make record of uniq char frequency ex: {a: 1, b: 2}
 *  then go through the second string and reduce the uniq char frequency count
 *  each time when you reduce, check the frequency again, if it is less then 0
 *  then return false because for that char, in the second string, has higher frequency
 * 
 *  then default return to true if the code gets to the very end
 *  
 *  time: both string will be the same length else it would be returned early on
 *  so if the length is n, then though both string of same length would be 2n,
 *  aka n
 *  space: if all chars are unique then the frequency record would be the same
 *  length as both string. so n again
 */

export function arePermutations(str1, str2) {
  const freqRecord = {};
  for (let i = 0; i < str1.length; i++) {
    const curChar = str1[i];
    freqRecord[curChar] = freqRecord[curChar] || 0;
    freqRecord[curChar]++;
  }

  for (let i = 0; i < str2.length; i++) {
    const curChar = str2[i];
    freqRecord[curChar] = freqRecord[curChar] || 0;
    freqRecord[curChar]--;
    if (freqRecord[curChar] < 0) {
      return false;
    }
  }
  return true;
}

describe('check permutation', () => {
  it('should return true for aab, aba', () => {
    const str1 = 'aab';
    const str2 = 'aba';
    expect(arePermutations(str1, str2)).to.be.true;
  });
  it('should return false for aab, abd', () => {
    const str1 = 'aab';
    const str2 = 'abd';
    expect(arePermutations(str1, str2)).to.be.false;
  });
});