/**
 * Given an integer, find the next permutation of it in absolute order.
 * For example, given 48975, the next permutation would be 49578.
 * 
 * solution: go from left to right and find the last digit that is smaller than the one on immediate right
 * that is the first digit that you can switch with anything on the right
 * then swap with the smallest of the larger number on the right
 * then reverse the entire right section
 * put everything back together into a number
 */

export function findNextLargerPermutation(number: number): number {
  const digits: Array<number> = number.toString().split('').map((numStr) => +numStr);
  const swappableIndex = digits.reduce((index, curNum, curIndex) => {
    const rigthDigit = digits[curIndex + 1];
    return curNum < rigthDigit ? curIndex : index;
  }, -1);

  if (swappableIndex === -1) {
    return NaN;
  }

  const swappableNum = digits[swappableIndex];
  const toSwapIndex = digits.reduce((toSwapIndex, curNum, curIndex) => {
    return swappableNum < curNum ? curIndex : toSwapIndex;
  }, -1);

  digits[swappableIndex] = digits[toSwapIndex];
  digits[toSwapIndex] = swappableNum;

  const leftDigits = digits.slice(0, swappableIndex + 1);
  const rigthDigit = digits.slice(swappableIndex + 1).reverse();
  const finalNumStr = [...leftDigits, ...rigthDigit].map((num) => `${num}`).join('');
  return +finalNumStr;
}

describe('Find next larger permutation', () => {
  it('Should return correctly for example', () => {
    const nextLarger = findNextLargerPermutation(48975);
    expect(nextLarger).to.equal(49578);
  });
  it('Should return correctly for large number', () => {
    const nextLarger = findNextLargerPermutation(1234123459877777);
    expect(nextLarger).to.equal(1234123475777789);
  });
  it('Should return NaN for nothing found', () => {
    const nextLarger = findNextLargerPermutation(9876543210);
    expect(nextLarger.toString()).to.equal('NaN');
  });
  it('Should return NaN for nothing found', () => {
    const nextLarger = findNextLargerPermutation(9876543210);
    expect(nextLarger.toString()).to.equal('NaN');
  });
});