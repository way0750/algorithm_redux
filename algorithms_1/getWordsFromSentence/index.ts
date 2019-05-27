// Given a dictionary of words and a string made up of those words (no spaces), return the original sentence in a list. If there is more than one possible reconstruction, return any of them. If there is no possible reconstruction, then return null.
//
// For example, given the set of words 'quick', 'brown', 'the', 'fox', and the string "thequickbrownfox", you should return ['the', 'quick', 'brown', 'fox'].
//
// Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond', and the string "bedbathandbeyond", return either ['bed', 'bath', 'and', 'beyond] or ['bedbath', 'and', 'beyond'].

/**
 * the quck and intuative way: loop from left to right and get one valid word, then pass the remaining string to the next recursive call to see if this set up will yield any valid pattern at all.
 * if nothing returns from the recursive call, then keep add new char to the already valid word to see if you can make a longer and valid word
 * if yes then again pass the remaining string to next call.
 * 
 * reusable calculation here. so caching all sub string that can be completely divided in to valid words
 * 
 * recursive case: if remaing string isn't empty, recursively call with it.
 * what to always return:
 *   an array of strings, this is a valid sub pattern
 *   or null for no sub pattern found
 * what to do with return:
 *   if the return is null, then try to search more. If found noting at the end, just return null.
 *   if the reutnr is an array, then you have found a valid sub pattern, prepend current valid word to it
 * how to make problem smaller:
 *   keep taking one char from the input string until finding a valid word, and then pass the remaining string to next call
 *   if the return from the subsequent recursive call is null, keep taking char from the beginning of the string
 */

export function search(dict, str, cache = {}) {
  let curWord = '';
  let remainingStr = str;
  while(remainingStr) {
    curWord += remainingStr.slice(0,1);
    remainingStr = remainingStr.slice(1);
    if (dict[curWord] && remainingStr) {
      const recursiveReturn = cache[remainingStr] || search(dict, remainingStr, cache);
      if (recursiveReturn) {
        cache[str] = [curWord, ...recursiveReturn];
        return cache[str];
      }
    } else if(dict[curWord] && !remainingStr) {
      cache[str] = [curWord];
      return cache[str];
    }
  }
  cache[str] = null;
  return cache[str];
}

function getWords(dict, str) {
  const wordHash = dict.reduce((hash, word) => {
    hash[word] = true;
    return hash;
  }, {});
  const hash = {};
  return search(wordHash, str, hash);
}

describe('Get words from sentence', () => {
  it('should return example return like above', () => {
    const words = ['quick', 'brown', 'the', 'fox'];
    const string = 'thequickbrownfox';
    expect(getWords(words, string)).to.deep.equal(['the', 'quick', 'brown', 'fox']);
  });

  it('should return example return like above', () => {
    const dict = [ 'cat', 'dog', 'chases' ];
    const str = "catchasesdog";
    expect(getWords(dict, str)).to.deep.equal(['cat', 'chases', 'dog']);
  });

  it('should return null for no pattern found', () => {
    const dict = [ 'cat', 'dog', 'chases' ];
    const str = "catchasesdogwrong";
    expect(getWords(dict, str)).to.deep.equal(null);
  });

  it('should return null for no pattern found', () => {
    const dict = [ 'cat', 'dog', 'chases' ];
    const str = "nothingfound";
    expect(getWords(dict, str)).to.deep.equal(null);
  });

  it('should return array for pattern found', () => {
    const dict = ['a', 'b', 'c'];
    const str = "abccb";
    expect(getWords(dict, str)).to.deep.equal(['a', 'b', 'c', 'c', 'b']);
  });

  it('should return vaid pattern after backtracking', () => {
    const dict = ['abc', 'defbb', 'def', 'cbs'];
    const str = 'abcdefbbcbs';
    expect(getWords(dict, str)).to.deep.equal(['abc', 'defbb', 'cbs']);
  });
});