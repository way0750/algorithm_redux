/**
 * given a string consisted of 4 digits
 * create the largest possible time in military time format
 * like: 12:34
 * if not possible return "00:00"
 * 
 * if always 4 digits, you can just simply create all possible permutations
 * and pick the largest one
 * for 4 digits
 * ex: abcd
 * abdc
 * badc
 * bdac
 * bdca
 * adbc
 * dabc
 * dbac
 * dbca
 * adcb
 * dacb
 * dcab
 * dcba
 * abcd
 * bacd
 * bcad
 * bcda
 * acbd
 * cabd
 * cbad
 * cbda
 * acdb
 * cadb
 * cdab
 * cdba
 */

function insertCharAtAllPositions(string, char, cb) {
  for (let insertPos = 0; insertPos <= string.length; insertPos++) {
    const leftSide = string.slice(0, insertPos);
    const rightSide = string.slice(insertPos);
    cb(`${leftSide}${char}${rightSide}`);
  }
}

export function getAllPermutations(string) {
  if (string.length < 2) {
    return string;
  }
  const subPermutations = getAllPermutations(string.slice(1));
  const allPermutations = [];
  subPermutations.forEach((permutation) => {
    insertCharAtAllPositions(permutation, string[0], (newPermutation) => {
      allPermutations.push(newPermutation);
    });
  });

  return allPermutations;
}

function getLargestTime(digitStr) {
  const allPossiblePatterns = getAllPermutations(digitStr);
  let curLargestTime = new Date('00:00');
  let curLargestTimeStr = '00:00';
  allPossiblePatterns.forEach((timePattern) => {
    const hr = Number(timePattern.slice(0,2));
    const minuets = Number(timePattern.slice(2));
    if (hr < 24 && minuets < 60) {
      const timeStr = `${hr}:${minuets}`;
      const time = new Date(timeStr);
      if (time > curLargestTime) {
        curLargestTime = time;
        curLargestTimeStr = timeStr
      }
    }
  });

  return curLargestTimeStr;
}