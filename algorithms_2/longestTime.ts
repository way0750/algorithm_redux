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
    return [string];
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
  if((digitStr.match(/[6789]/g) || []).length > 2) {
    return '00:00';
  }
  const allPossiblePatterns = getAllPermutations(digitStr);
  let curLargestHr = 0;
  let curLargestMin = 0;
  allPossiblePatterns.forEach((timePattern) => {
    const hr = Number(timePattern.slice(0,2));
    const minuets = Number(timePattern.slice(2));
    if (hr < 24 && minuets < 60) {
      const foundLargerTime = (hr > curLargestHr)
        || (hr === curLargestHr && minuets > curLargestMin);
      if (foundLargerTime) {
        curLargestHr = hr;
        curLargestMin = minuets;
      }
    }
  });

  const hrStr = `${curLargestHr}0`.slice(0,2);
  const minStr = `${curLargestMin}0`.slice(0,2);
  return `${hrStr}:${minStr}`;
}

describe('get largest time', () => {
  it('should get all the permutations for 4 digits', () => {
    const str = '1234';
    expect(getAllPermutations(str).length).to.eql(24);
  });
  it('should get all the permutations for 4 digits', () => {
    const str = '1234';
    expect(getAllPermutations(str).length).to.eql(24);
  });
  it('should return the largest time', () => {
    const str = '2359';
    expect(getLargestTime(str)).to.eql('23:59');
  });
  it('should return the 00:00', () => {
    const str = '0000';
    expect(getLargestTime(str)).to.eql('00:00');
  });
  it('should return the 00:00', () => {
    const str = '1999';
    expect(getLargestTime(str)).to.eql('00:00');
  });
  it('should return the 00:00', () => {
    const str = '1666';
    expect(getLargestTime(str)).to.eql('00:00');
  });
});