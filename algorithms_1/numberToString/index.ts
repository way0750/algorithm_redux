/**
 * Given a number, convert it to a string
 * ex: 234 returns 'two hundred thrid four'
 */

/**
 * solution:
 * get digit out of the number one by one from right to left
 * then for each group of 3 digits translate that group without thousand, millions, etc...
 * eventually you will end up with bunch of groups of those string, map each to the right "unit", like thousand, millions, etc..
 * put them together and return
 */

// if num is 0 or 000 return empty string
const oneDigitMap = {
  0: '',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine'
};
const teenMap = {
  0: '',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifthteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'ninteen'
};
const tyMap = {
  0: '',
  20: 'twenty',
  30: 'thirty',
  40: 'fourty',
  50: 'fifthty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninty'
}
function numToStringBasicTranslate(nums: Array<number>): string {
  // 1 digit
  if (nums.length === 1) {
    return oneDigitMap[nums[0]];
  } else if (nums.length === 2) {
    // two digits
    const tenthDigit = nums[0] * 10;
    const firstDigit = nums[1];
    const teenNum = teenMap[tenthDigit + firstDigit];
    if (teenNum) {
      return teenNum;
    } else {
      const tenthStr = tyMap[tenthDigit]
      const firstStr = numToStringBasicTranslate([firstDigit]);
      console.log(tenthStr, firstStr);
      return tenthStr ? `${tenthStr} ${firstStr}` : firstStr;
    }
  } else if (nums.length === 3) {
    // three digits
    let hundredthStr = oneDigitMap[nums[0]];
    const tenthStr = numToStringBasicTranslate(nums.slice(1));
    if (hundredthStr === '') {
      return tenthStr
    } else {
      hundredthStr += ' hundred';
      return tenthStr ? `${hundredthStr} ${tenthStr}` : hundredthStr;
    }
  } else {
    return '';
  }
}

export function numToString (num: number) {
  const numBrackets = [];
  let curBracket = [];
  let curNum = num; // this number will get smaller
  while (curNum) {
    const curDigit = curNum % 10;
    curBracket.unshift(curDigit);
    curNum = Math.floor(curNum / 10);
    if (curBracket.length === 3 || curNum === 0) {
      numBrackets.push(curBracket);
      curBracket = [];
    }
  }

  const units = ['', 'thousand', 'million', 'billion', 'trillion'];
  const numBracketsStr = numBrackets.map((bracket, index) => {
    const str = numToStringBasicTranslate(bracket);
    if (str) {
      return index === 0? str : `${str} ${units[index]}`;
    } else {
      return ``;
    }
  });

  return numBracketsStr.reduceRight((str, bracketStr: string) => {
    return bracketStr ? `${str} ${bracketStr}` : str;
  });
}

describe(' number to string', () => {
  it('should return the right string for 15647389', () => {
    const result = numToString(15647389);
    expect(result).to.deep.equal('fifthteen million six hundred fourty seven thousand three hundred eighty nine');
  });

  it('should return the right string for 1000000000', () => {
    const result = numToString(1000000000);
    expect(result).to.deep.equal('one billion');
  });
});