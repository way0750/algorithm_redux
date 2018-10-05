// There exists a staircase with N steps
// and you are given type of positive steps you can make at a time, ex: 1 steps, 2 steps, 7 steps
// Given N, write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.

// For example, if N is 4, and you can only make 1 and 2 steps then there are 5 unique ways:
// 1, 1, 1, 1
// 2, 1, 1
// 1, 2, 1
// 1, 1, 2
// 2, 2

/**
 * If you can make lets 2 and 3 steps, and N = 100
 * if you make 2, 2, then 2 steps, that's total of 6 steps made and 94 left
 * if you mkae 3, 3 steps, that's total of 6 steps made also, and also 94 teps left
 * so in searching all possible unique stepping patterns, there must be some calculations that bould be reused.
 * use caching!
 * 
 * solution 1:
 * use dynamic programming
 * we can building case from 0 step all the way to n steps, and save each step in the cache
 * then return it at the end with cache of n step
 * 
 * and here is how we can seach for all possible patterns in each n
 * using recursion:
 * basecase: if input n is 0 return [[]] meaning a list of 1 possible patterns has been found
 * what to always return: an array of sub array: a collection of sub patterns
 * what to do with those sub patterns: put the current stepping option in front of the sub patter
 * how to make problem smaller:
 *   smaller in terms of N, so passing N - steppingOptionNum to the next recursive call
 */

function patternSearch(stepOptions: Array<number>, n: number, cache: object = {}) {
  if (n === 0) {
    // return [[]] in patternSeach means one pattern has been found
    // which is different the n === 0  in the allUniqSteps function
    return [[]];
  } else if (n < 0) {
    return [];
  }

  let allPatterns = [];
  stepOptions.forEach((curStepOption: number) => {
    const newN = n - curStepOption;
    let subPatterns = cache[newN]
      ? cache[newN]
      : patternSearch(stepOptions, newN, cache);
    subPatterns = subPatterns.map((subPattern: Array<number>) => {
      return subPattern.unshift(curStepOption);
    });
    allPatterns.push(...subPatterns);
  });
  cache[n] = allPatterns;
  return allPatterns;
}

function allUniqSteps(stepOptions, n): Array<Array<number>> {
  const AllDPCases = {};
  for (let DPCase = 0; DPCase <= n; DPCase++) {
    AllDPCases[DPCase] = patternSearch(stepOptions, DPCase);
  }

  // have to deal with the edge case when n is 0
  // should return [] which means no pattern has been found
  return n === 0 ? [] : AllDPCases[n];
}