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

function findAllPossibleWays(msg: string, cache: object = {}): Array<Array<string>> {
  if (cache[msg]) {
    return cache[msg];
  } else if (!msg) {
    // a list of an empty pattern as base case
    return [[]];
  }
  const leadPattern1 = msg.slice(0, 1);
  let combinedPatterns1 = [];
  const allSubPattern1 = findAllPossibleWays(msg.slice(1));
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
    const allSubPattern2 = findAllPossibleWays(msg.slice(2));
    combinedPatterns2 = allSubPattern2.map((arr: Array<string>) => {
      return [leadPattern2, ...arr];
    });
  }

  cache[msg] = [...combinedPatterns1, ...combinedPatterns2];

  return cache[msg];
}

// const msg1 = '220111';
const msg1 = '00111'
const results = findAllPossibleWays(msg1);
results;