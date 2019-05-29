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
      finalPermutations.push(curChar);
    } else if (!visitedChars[curChar]) {
      visitedChars[curChar] = true;
      finalPermutations = finalPermutations.reduce((curPermu, previousPermu) => {
        for(let j = 0; j <= previousPermu.length; j++) {
          const leftStr = previousPermu.slice(0, j);
          const rightStr = previousPermu.slice(j);
          curPermu.push(`${leftStr}${curChar}${rightStr}`);
        }
      }, []);
    }
  }

  return finalPermutations;
}