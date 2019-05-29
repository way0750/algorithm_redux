/**
 * Write a method to compute all permutations of a string of unique characters.
 * set currentPermutations to []
 * go through each character, for each character, if currentPermutations is empty
 * just add it self
 * but if currentPermutations is not empty, add to each position to each string
 * in that array. you will end up with more permutations, let those replace currentPermutations
 * ex ['a']
 * curChar is 'b'
 * you get 'ba' and 'ab'
 */

export function getPermutations(str) {
  const visitedChars = {};
  let finalPermutations = [];
  for (let i = 0; i < str.length; i++) {
    const curChar = str[i];
    if (!finalPermutations.length) {
      visitedChars[curChar] = true;
      finalPermutations.push(curChar);
    } else if (!visitedChars[curChar]) {
      visitedChars[curChar] = true;
      finalPermutations = finalPermutations.reduce((curPermu, previousPermu) => {
        for(let j = 0; j <= previousPermu.length; j++) {
          const leftStr = previousPermu.slice(0, j);
          const rightStr = previousPermu.slice(j);
          curPermu.push(`${leftStr}${curChar}${rightStr}`);
        }
        return curPermu;
      }, []);
    }
  }

  return finalPermutations;
}

describe('get permutation', () => {
  it('should return empty array for empty string', () => {
    const str = '';
    expect(getPermutations(str)).to.eql([]);
  });
  it('should return array of one char for string of one char', () => {
    const str = '1';
    expect(getPermutations(str)).to.eql(['1']);
  });
  it('should return array of two permutations for string of two chars', () => {
    const str = '12';
    expect(getPermutations(str)).to.eql(['21', '12']);
  });
  it('should return array of two permutations for string of two unique chars and bunch of repeated chars', () => {
    const str = '1222121212121212';
    expect(getPermutations(str)).to.eql(['21', '12']);
  });

  it('should return correctly for a long string with repeated chars', () => {
    const str = 'abcdaaddbbbdd';
    const permutations = getPermutations(str);
    const expected = [
      'dcba',
      'cdba',
      'cbda',
      'cbad',
      'dbca',
      'bdca',
      'bcda',
      'bcad',
      'dbac',
      'bdac',
      'badc',
      'bacd',
      'dcab',
      'cdab',
      'cadb',
      'cabd',
      'dacb',
      'adcb',
      'acdb',
      'acbd',
      'dabc',
      'adbc',
      'abdc',
      'abcd'
    ];
    expect(permutations).to.eql(expected);
  });
});