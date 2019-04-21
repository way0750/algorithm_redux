/**
 * Given a string containing only digits, restore it by returning all possible valid IP address combinations.
    Example:
    Input: "25525511135"
    Output: ["255.255.11.135", "255.255.111.35"]

    some observation:
    if the input is 11111111
    you can go through all possible permutation like this:
    1.11.11111
    11.1.11111
    see the the last 11111?
    it is reusable for 1.11 and 11.1
    that means we can potentially save calculation by caching results

    solution:
    1.....
    then
    11.....
    111.....
    1111...... 1111 > 255 so stop here for the first segment
 *  take 1 number first, then take 2 number, then take 3 and then pass the
 *  renaming to the next call to get 3 segments of numbers, if non-empty array
 *  is returned from subsequent calls, then add to current segment
 * if nothing then do nothing
 * 
 * recursion setup:
 * base case: we will pass a stack num to tell which segment are we at
 *    so when the segment is at 4, then that's the base case
 *    what to return at base case:
 *    if the input string is empty then return [];
      if the entire input string is larger then 255, return [] becase we have to
      use the entire string as it is without further slicing because there is no
      more sub sequent call anymore
 *    if 255 or less, return [itself]

   how to make problem smaller:
   slice the input string 3 times, each time slice 1 char further:
   if input: '1234567'
   1: '1'
   2: '12'
   3: '123' // if larger than 255 don't recursively call
   then pass the remaining to the subsequent calls

   what to do with returns:
 * add current sliced segment to the front of each returned string, and then add
 * this new string to some sort of final array
 * 
 * 
 * what to always return: an array of string "ip"

 */
export function isValid(string) {
  const noLeading0 = string.length > 1 ? string[0] !== '0' : true;
  const noEmpty = !!string.length;
  const isSmallerThan255 = +string <= 255;
  return noLeading0 && noEmpty && isSmallerThan255;
}

function restoreIpAddressesMy(string, stackLevel = 0) {
  // got to the last stack level
  if (stackLevel >= 3) {
    // because this is the last stack, so we can't further slice the input
    // string, we have to use the input string as it is.
    return isValid(string) ? [string] : [];
  }

  const allPatterns = [];
  for (let slicingIndex = 1; slicingIndex < 4; slicingIndex++) {
    const curSegment = string.slice(0, slicingIndex);
    const remainingStr = string.slice(slicingIndex);
    if (isValid(curSegment)) {
      const subPatterns = restoreIpAddressesMy(remainingStr, stackLevel + 1);
      subPatterns.forEach((subPattern) => allPatterns.push(`${+curSegment}.${subPattern}`));
    }
  }

  return allPatterns;
}

function restoreIpAddressesLeetCode(string) {
  const allPatterns = [];
  for (let firstSegIndex = 1; firstSegIndex < 4; ++firstSegIndex) {
    for (let secondSegIndex = 1; secondSegIndex < 4; ++secondSegIndex) {
      for (let thirdSegIndex = 1; thirdSegIndex < 4; ++thirdSegIndex) {
        // let fourthSegIndex
        const firstSeg = string.substr(0, firstSegIndex);
        const secondSeg = string.substr(firstSegIndex, secondSegIndex);
        const thirdSeg = string.substr(firstSegIndex + secondSegIndex, thirdSegIndex);
        // make the fourth one use all the remaining digits
        const fourthSeg = string.substr(firstSegIndex + secondSegIndex + thirdSegIndex);
        if (isValid(firstSeg) && isValid(secondSeg) && isValid(thirdSeg) && isValid(fourthSeg)) {
          allPatterns.push(`${firstSeg}.${secondSeg}.${thirdSeg}.${fourthSeg}`);
        }
      }
    }
  }

  return allPatterns;
}

const allPossiblePatterns = [
  [0, 1, 2, 3], [0, 1, 2, 4], [0, 1, 2, 5],
  [0, 1, 3, 4], [0, 1, 3, 5], [0, 1, 3, 6],
  [0, 1, 4, 5], [0, 1, 4, 6], [0, 1, 4, 7],
  [0, 2, 3, 4], [0, 2, 3, 5], [0, 2, 3, 6],
  [0, 2, 4, 5], [0, 2, 4, 6], [0, 2, 4, 7],
  [0, 2, 5, 6], [0, 2, 5, 7], [0, 2, 5, 8],
  [0, 3, 4, 5], [0, 3, 4, 6], [0, 3, 4, 7],
  [0, 3, 5, 6], [0, 3, 5, 7], [0, 3, 5, 8],
  [0, 3, 6, 7], [0, 3, 6, 8], [0, 3, 6, 9]
];

export function restoreIpAddresses(string) {
  return allPossiblePatterns.reduce((IPs, pattern) => {
    // get the segments:
    const segments = pattern.map((sliceStart, i) => string.slice(sliceStart, pattern[i+1]));
    if (segments.every((segment) => isValid(segment))) {
      IPs.push(segments.join('.'));
    }
    return IPs;
  }, []);
}



describe('restore IP address', () => {
  it('should work with the example', () => {
    const string = '25525511135';
    expect(restoreIpAddresses(string)).to.eql(['255.255.11.135', '255.255.111.35']);
  });
  it('should return [] if not enough digits', () => {
    const string = '123';
    expect(restoreIpAddresses(string)).to.eql([]);
  });
  it('should return [] if too many digits', () => {
    const string = '1234567890123456789';
    expect(restoreIpAddresses(string)).to.eql([]);
  });
  it('should return [] if can not create seg with value <= 255', () => {
    const string = '333333333333';
    expect(restoreIpAddresses(string)).to.eql([]);
  });
  it('should work with "010010"', () => {
    const string = '010010';
    expect(restoreIpAddresses(string)).to.eql(['0.10.0.10','0.100.1.0']);
  });
});
