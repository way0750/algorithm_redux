/**
 * Given an array of numbers, returns a new array in which each number is a product
 * of the entire input array numbers without the one at that index
 * ex: [1, 2, 3, 4, 5]
 * return [120, 60, 40, 30, 24]
 * what if you can't use division?
 * 
 * 
 * solution one, can use division:
 * simply get the product of the entire array, then map the input array by diving product by
 * each number at each index
 */

function productsWithoutSelfWithDivision(numbers: Array<number>): Array<number> {
  const product = numbers.reduce((product, num) => product * num);
  const products = numbers.map((num) => product / num );
  return products
}

const numbers = [1, 2, 3, 4, 5];

// productsWithoutSelfWithDivision(numbers);

/**
 * without using division:
 * ex: [1, 2, 3, 4, 5]
 * then if you map out the five iteraction, this is how it looks like:
 * [(1), 2, 3, 4, 5]
 * [1, (2), 3, 4, 5]
 * [1, 2, (3), 4, 5]
 * [1, 2, 3, (4), 5]
 * [1, 2, 3, 4, (5)]
 * 
 * it is like there is a downward diagonal line there
 * you can have an accumulative partial products for the left side of the triangle, save each at new array at the same index
 * as the iteraction
 * then iteract from bottom and up and do the same, mutiple all the partial products at the same index, done
 * also, for current index, just replace that number with 1 and multiple
 * 
 */

function productsWithoutSelfWithoutDivision(numbers: Array<number>): Array<number> {
  const leftTriangleNums = [];
  let leftAccumulator = 1;
  // iteracting downward
  for (let i = 0; i < numbers.length; i++) {
    const previousNum = i - 1 < 0 ? 1 : numbers[i - 1];
    leftAccumulator = leftAccumulator * previousNum;
    leftTriangleNums.push(leftAccumulator);
  }

  // iteracting upward but reversing it first
  const reversedNums = numbers.reverse();
  let rightAccumulator = 1;
  let rightTriangleNums = [];
  for (let i = 0; i < reversedNums.length; i++) {
    const previousNum = i - 1 < 0 ? 1 : reversedNums[i - 1];
    rightAccumulator = rightAccumulator * previousNum;
    rightTriangleNums.push(rightAccumulator);
  }
  // reversing the rightTriangleNumbs for merging with leftTriangleNums later
  rightTriangleNums = rightTriangleNums.reverse();

  const products = leftTriangleNums.map((leftPartialNum, index) => {
    const rightPartialNum = rightTriangleNums[index];
    return leftPartialNum * rightPartialNum;
  })

  return products;
}

productsWithoutSelfWithoutDivision(numbers);