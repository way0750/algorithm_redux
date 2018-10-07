/**
 * given a list of words, find the longest chain of words in the following way:
 * input: [spring, in, sin, spin, cat, day, dog, food, sping, shoes]
 * return: [in, sin, spin, sping, spring]
 * 
 * each word in the chain increases by one extra character than the previous word
 * and the order the of letters from previous have be maintained
 * ex: [ab, bka] this is't a chain, because kba, even though it has both ab from prevous
 * word, the order isn't maintained
 * [ab, akb], this is a chain, akb has both 'a' and 'b', and the order is maintained in akb
 * 
 * solution 1:
 * put all words in the list into a hash, then loop through each word in the input list.
 * input: [spring, in, sin, spin, cat, day, dog, food, sping, shoes]
 * put all of them in a hash :
 * {
      spring: {children: [], longestChain: []},
      in: {children: [], longestChain: []},
      sin: {children: [], longestChain: []},
      spin: {children: [], longestChain: []},
      cat: {children: [], longestChain: []},
      day: {children: [], longestChain: []},
      dog: {children: [], longestChain: []},
      food: {children: [], longestChain: []},
      sping: {children: [], longestChain: []},
      shoes:{children: [], longestChain: []} 
 * }
 * 
 * you essentially end up with a bunch of graphs
 * then do a loop through the input list and link all the words in the graph
 * then do a depth first seach and concate longestChains together
 * and return the longest one.
 */

function makeGraph(dict: Array<string>): object {
  // initialize graph:
  const graph = dict.reduce((hash, word) => {
    hash[word] = { children: [], longestChain: [] };
    return hash;
  }, {});

  // link the graph nodes up:
  dict.forEach((word) => {
    // loop through each char in a word, delete it, and check
    // graph if that word exist, if yes, put current word in that word's children list
    for(let posOfCharToDel = 0; posOfCharToDel < word.length; posOfCharToDel++) {
      // new word is created by slice a word into two sides:
      // left and right
      //  left is slice from 0 up to the posOfCharToDel
      //  rigth is slice from posOfCharToDel + 1 to end
      const leftWord = word.slice(0, posOfCharToDel);
      const rightWord = word.slice(posOfCharToDel + 1);
      const newWord = leftWord + rightWord;
      const foundWordInGraph = graph.hasOwnProperty(newWord);
      // if the new word is found in the graph, then make current word
      // a child of that new word.
      if (foundWordInGraph) {
        graph[newWord].children.push(word);
      }
    }
  });
  return graph;
}

// recursively depth first seach
// what to always return: array of string/word
// how to make problem smaller: each children is essentially a smaller problem
//   so pass in the child, one by one, to next recursive call
// recursive case: the pass in child: string, is not found in the graph
//   return []
// what to do with returns
//   after checking all childrent and their longestChains, pick the first longest long
//   and put curernt node/word to front the chain and return it

function graphSearch(word: string, graph): Array<string> {
  // if the longestChain has already been saved
  // just return it
  if (graph[word].longestChain.length) {
    return graph[word].longestChain;
  }
  let longestChildChain = [];
  const children = graph[word].children;
  children.forEach((child) => {
    const childChain = graphSearch(child, graph);
    if (childChain.length > longestChildChain.length){
      longestChildChain = childChain;
    }
  });

  // add self to the longest child chain
  graph[word].longestChain = [word, ...longestChildChain];
  return graph[word].longestChain;
}

function longestChain(dict: Array<string>) {
  let currentLongestChain = [];
  const graph = makeGraph(dict);
  dict.forEach((word) => {
    const curWordChain = graphSearch(word, graph);
    if (curWordChain.length > currentLongestChain.length) {
      currentLongestChain = curWordChain;
    }
  });

  return currentLongestChain;
}

describe('using graph to find longest word chain', () => {
  it('should return the same as the exaple above', () => {
    const dict = ["spring", "in", "sin", "spin", "cat", "day", "dog", "food", "sping", "shoes"];
    const expectedResult = ["in", "sin", "spin", "sping", "spring"];
    const actualResult = longestChain(dict);
    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('should return empty array if nothing is provided', () => {
    const dict = [];
    const expectedResult = [];
    const actualResult = longestChain(dict);
    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('should return first longest chain, first by the first word found in the input array', () => {
    const dict = [
      "spring", "in", "sin", "spin", "cat", "day", "dog", "food", "sping", "shoes",
      "a", "ab", "abc", "labc", "zlabc"
    ];
    const expectedResult = ["in", "sin", "spin", "sping", "spring"];
    const actualResult = longestChain(dict);
    expect(actualResult).to.deep.equal(expectedResult);
  });
});