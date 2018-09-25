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

productsWithoutSelfWithDivision(numbers);