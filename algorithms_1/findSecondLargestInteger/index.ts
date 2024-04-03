/**
 * Given a array of unsorted integers return the second largest, if none could be found then return null.
 */

export function findSecondLargest(array: Array<number>): number|any {
  let largestInt = null;
  let secondLargestInt = null;
  array.forEach((number) => {
    if (largestInt === null) {
      largestInt = number
    } else if (secondLargestInt === null) {
      secondLargestInt = Math.min(largestInt, number);
      largestInt = Math.max(largestInt, number);
    } else if (number > largestInt) {
      secondLargestInt = largestInt
      largestInt = number
    } else {
      secondLargestInt = Math.max(secondLargestInt, number);
    }
  });

  return secondLargestInt;
}

describe('Testing find the second largest int', () => {
  it('should work with empty array and return null', () => {
    const numbers = []
    const secondLargestInt = findSecondLargest(numbers);
    expect(secondLargestInt).to.equal(null);
  });

  it('should return null if array has only 1 int', () => {
    const numbers = [99]
    const secondLargestInt = findSecondLargest(numbers);
    expect(secondLargestInt).to.equal(null);
  });

  it('should return second largest if array has 2 or more int', () => {
    let numbers = [88, 99]
    let secondLargestInt = findSecondLargest(numbers);
    expect(secondLargestInt).to.equal(88);

    numbers = [77, 88, 99]
    secondLargestInt = findSecondLargest(numbers);
    expect(secondLargestInt).to.equal(88);
  });

  it('should return second largest if all numbers are the same', () => {
    let numbers = [88, 88]
    let secondLargestInt = findSecondLargest(numbers);
    expect(secondLargestInt).to.equal(88);

    numbers = [88, 88, 88]
    secondLargestInt = findSecondLargest(numbers);
    expect(secondLargestInt).to.equal(88);
  });

  it('should return second largest if all numbers are the same', () => {
    let numbers = [77, 88, 88]
    let secondLargestInt = findSecondLargest(numbers);
    expect(secondLargestInt).to.equal(88);
  });

  it('the real test', () => {
    let numbers = [100, 90, 80, 70, 60]
    let secondLargestInt = findSecondLargest(numbers);
    expect(secondLargestInt).to.equal(90);
  });
});