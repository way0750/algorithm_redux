/**
 * Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.
 * For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.
 * You can assume that the messages are decodable. For example, '001' is not allowed. 
 * 
 * 
 * Solution 1
 * Oo from left to right, take one char and ask what are all the possible ways from the sub string
 * Then take two char and same question
 * 
 * Once you get all the possible ways, add the char you take to each way
 * EX: 
 * 2111
 * Take 2, then ask 111 what are all the possible ways?
 *   they are 1,1,1; 1,11; 11,1
 *   add 2 to each of them: 2,1,1,1, 2,1,11, 2,11,1
 * Take 21, then ask 11 what are all the possible ways?
 *   same thing here
 * Keep looping to the next index
 * 
 * You need to cache the returns so you can avoid a ton of calls
 */

/**
 * helper function to edge cases that when there a bunch of zeros in front of the string
 */
function removeLeadingZeros(number: string): string{
  if (number === '') {
    return number;
  } else {
    return number.replace(/^0+/, '');
  }
}

function findAllPossibleWays(msg: string, cache: object = {}): Array<Array<string>> {
  msg = removeLeadingZeros(msg);
  if (cache[msg]) {
    return cache[msg];
  } else if (!msg) {
    // a list of an empty pattern as base case
    return [[]];
  }
  const leadPattern1 = msg.slice(0, 1);
  let combinedPatterns1 = [];
  const allSubPattern1 = findAllPossibleWays(msg.slice(1), cache);
  combinedPatterns1 = allSubPattern1.map((arr: Array<string>) => {
    if (+leadPattern1 > 0) {
      return [leadPattern1, ...arr];
    } else {
      return [...arr];
    }
  });

  const leadPattern2 = Number(leadPattern1) > 0 ? msg.slice(0, 2) : msg.slice(1, 2);
  let combinedPatterns2 = []
  if (leadPattern2 !== leadPattern1 && Number(leadPattern2) < 27 && Number(leadPattern2) > 0) {
    const allSubPattern2 = findAllPossibleWays(msg.slice(2), cache);
    combinedPatterns2 = allSubPattern2.map((arr: Array<string>) => {
      if (+leadPattern2 > 0) {
        return [leadPattern2, ...arr];
      } else {
        return [...arr];
      }
    });
  }

  cache[msg] = [...combinedPatterns1, ...combinedPatterns2];

  return cache[msg];
}

function findAllPossibleWays002(number: string, cache: object = {}) {
  if (cache[number]) {
    return cache[number];
  } else if (number === '0' || number === '') {
    return [[]];
  }
  const leadingNumber1 = number.slice(0,1);
  const subNumber1 = number.slice(1);
  const subPatterns1 = findAllPossibleWays002(subNumber1, cache);
  const combinedPatterns1 = subPatterns1.map((subPattern: Array<string>) => {
    if (leadingNumber1 === '0') {
      return [...subPattern];
    } else {
      return [leadingNumber1, ...subPattern];
    }
  });

  const leadingNumber2 = '' + Number(number.slice(0,2));
  const subNumber2 = number.slice(2);
  let combinedPatterns2 = [];
  let subPatterns2 = [];
  if (!leadingNumber2.length || leadingNumber2 === leadingNumber1) {
    combinedPatterns2 = [];
  } else if (leadingNumber2 !== '0' && !cache[subNumber2]) {
    subPatterns2 = findAllPossibleWays002(subNumber2, cache);
    combinedPatterns2 = subPatterns2.map((subPattern: Array<string>) => {
      return [leadingNumber2, ...subPattern];
    });
  } else if (leadingNumber2 === '0' && !cache[subNumber2]) {
    subPatterns2 = findAllPossibleWays002(subNumber2, cache);
    combinedPatterns2 = subPatterns2.map((subPattern: Array<string>) => {
      return [...subPattern];
    });
  }

  cache[number] = [...combinedPatterns1, ...combinedPatterns2];
  return cache[number];
}

const msg1 = '111';
const cache = {};
const results = findAllPossibleWays002(msg1, cache);
results;