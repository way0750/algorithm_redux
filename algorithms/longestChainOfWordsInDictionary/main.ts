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
