const dictionary = {
  hi: 'hi',
  planet: 'planet',
  earth: 'earth',
  plane: 'plane',
  plan: 'plan',
  tear: 'tear',
  ear: 'ear',
  hip: 'hip',
  lan: 'lan',
};
// hiplanetearth = 12 





// 012
// abc
// 
export function parseWords(string) {
  const veryLastChar = string[string.length-1];
  const cache = {
    [veryLastChar]: []
  };

  for (let i = string.length-1; i > -1; i--) {
    const curMainString = string.slice(i);
    // there is a bug here next line:
    for (let wordEndingIndex = i + 2; wordEndingIndex <= string.length; wordEndingIndex++) {
      const curWord = string.slice(i, wordEndingIndex);
      const remainingString = string.slice(wordEndingIndex);
      // check if current word is found in the dictionary
      if (dictionary[curWord] && (!remainingString || cache[remainingString].length)) {
        console.log(curMainString);
        cache[curMainString] = remainingString ? [curWord].concat(cache[remainingString]) : [curWord];
      }
    }

    // if nothing has bee saved in the cache for curMainString
    // in that case, we will have to assign an empty array to it to keep all
    // cache value consistent
    console.log(curMainString);
    if(!cache[curMainString]) {
      cache[curMainString] = [];
    }
  }

  console.log(JSON.stringify(cache, null, 2));
  return cache[string];
}

describe('hiplanetearth',() => {
  it('should not work with abc', () => {
    const str = 'abc';
    expect(parseWords(str)).to.eql([]);
  });
  it('should work with hiplanetearth', () => {
    const str = 'hiplanetearth';
    expect(parseWords(str)).to.eql(['hi', 'planet', 'earth']);
  });
});

/**
 * two tech two non-tech
 * value one is prepable
 *   go through the link and provide example for each value point
 *   if never run to the situation, predict what would you do
 * 
 * project you have worked on
 * the role in the confluent team, get to know them
 * 
 */