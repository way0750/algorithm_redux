// Given a sorted dictionary of an alien language, find order of characters
// Given a sorted dictionary (array of words) of an alien language, find order of characters in the language.
// Examples:

// Input:  words[] = {"baa", "abcd", "abca", "cab", "cad"}
// Output: Order of characters is 'b', 'd', 'a', 'c'
// Note that words are sorted and in the given language "baa" 
// comes before "abcd", therefore 'b' is before 'a' in output.
// Similarly we can find other orders.

// Input:  words[] = {"caa", "aaa", "aab"}
// Output: Order of characters is 'c', 'a', 'b'

/**
 * the input list has been sorted by the "alien" alphabet
 * sorting is the same as regular alphabet sorting between two strings:
 * ex: in English, if you need to sort "cat" and "bat", the result has to be "bat" then "cat"
 * so basically compare chars at same index of both strings
 * if same chars then no meaning sorting at that index
 * if diff chars, you put the char of lower index first in the sort order
 * so for the provided alien dictionary, words are already sorted
 * if you get this: ["baa", "abcd"], you know "b" is before "a" because meaning sorting is done at index 0
 * where the first different chars are found, and since the list is already sorted, then you know "b" is before "a"
 * 
 * solution 1:
 * compare adjacent words and find the char of first index where meaningful sorting is done
 * keep that two chars' orders that's an edge betwee two nodes/chars
 * keep find those orders/edges
 * once done make graph
 *   turn each char into node
 *   then link those nodes up
 * 
 * then do topological sort
 * for details: https://www.geeksforgeeks.org/topological-sorting/
 * 
 * do topoligical sort by using recursion:
 * base case: leaf node or node has been visited
 *   return [] 
 * what to always return: an array, this is the sub ordered list
 * what to do with return from lower stacks?
 *   put them in a main array
 *   you might have multiple returns prepend each return in the main array
 *   when all done, put current value/node in front
 * how to make problem smaller:
 *   just recursive call nodes that link from current node
 */

function getEdges(word1, word2) {
  const maxLoopLength = Math.max(word1.length, word2.length);
  for (let index = 0; index < maxLoopLength; index++) {
    const char1 = word1[index];
    const char2 = word2[index];
    if (!char1 || !char2) {
      return char1 ? [char1] : [char2];
    } else if (char1 !== char2) {
      return [char1, char2];
    }
  }
  return [];
}

function makeGraph(edges) {
  const graph = {};
  edges.forEach((edge) => {
    if (edge.length === 1) {
      const nodeValue = edge[0];
      graph[nodeValue] = { isVisited: false, value: nodeValue, edges: [] };
    } else if (edge.length === 2) {
      const firstNodeValue = edge[0];
      const secondNodeValue = edge[1];
      graph[firstNodeValue] = graph[firstNodeValue] || { isVisited: false, value: firstNodeValue, edges: [] };
      graph[secondNodeValue] = graph[secondNodeValue] || { isVisited: false, value: secondNodeValue, edges: [] };
      // add edges
      graph[firstNodeValue].edges.push(secondNodeValue);
    }
  });

  return graph;
}

// always return an array
function search(nodeValue, graph) {
  const node = graph[nodeValue];
  if (node.isVisited) {
    return [];
  }
  const sortedArray = [];
  // go through all the edges:
  const edges = graph[nodeValue].edges;
  edges.forEach((edge) => {
    const paths = search(edge, graph);
    sortedArray.unshift(...paths);
  });
  graph[nodeValue].isVisited = true;
  return [nodeValue, ...sortedArray];
}

function makeAlienDictOrder(dict) {
  const edges = [];
  for (let i = 0; i < dict.length - 1; i++) {
    const word1 = dict[i];
    const word2 = dict[i + 1];
    edges.push(getEdges(word1, word2));
  }
  const graph = makeGraph(edges);
  const nodeKeys = Object.keys(graph);

  const sortedWords = [];
  nodeKeys.forEach((nodeValue) => {
    const subSortedWords = search(nodeValue, graph);
    sortedWords.unshift(...subSortedWords);
  });

  return sortedWords;
}

describe('get edges', () => {
  it('should return array of 2 words', () => {
    const word1 = 'abc';
    const word2 = 'abd';
    expect(getEdges(word1, word2)).to.deep.equal(['c', 'd']);
  });

  it('should return array of 1 string', () => {
    const word1 = 'abc';
    const word2 = 'ab';
    expect(getEdges(word1, word2)).to.deep.equal(['c']);
  });

  it('shoudl return an empty array', () => {
    const word1 = 'abc';
    const word2 = 'abc';
    expect(getEdges(word1, word2)).to.deep.equal([]);
  });
});

describe('alien dictionary', () => {
  it('should return example', () => {
    const words = [ "baa", "abcd", "abca", "cab", "cad" ];
    const expectedReturn = ['b', 'd', 'a', 'c'];
    expect(makeAlienDictOrder(words)).to.deep.equal(expectedReturn);
  });
  it('another one', () => {
    const words = [
      'bat', 'bac', 'add', 'kgg', 'kag'
    ];
    expect(makeAlienDictOrder(words)).to.deep.equal(['g', 'b', 'a', 'k', 't', 'c']);
  });
});