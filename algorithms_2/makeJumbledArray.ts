/**
 * The sequence [0, 1, ..., N] has been jumbled, and the only clue
 * you have for its order is an array representing whether each
 * number is larger or smaller than the last. Given this information,
 * reconstruct an array that is consistent with it. For example,
 * given [None, +, +, -, +], you could return [1, 2, 3, 0, 4].
 * 
 * solution 1:
 * you will have bunch of +, -, and 1 NONE in the array
 * the thing about + signs is that, you can fill them up with just number
 * incrementing by 1: 4,5,6,7,8,9
 * for -: you can just fill them with: 9,8,7,6,5,4,3
 *   and this solves the problem of multiple - signs: + - - - - - 
 * 
 * set numberFromBack to input array length -1 
 * set numberFromFront to 0
 * map the input array from right to left:
 *   for each element, if it is + or NONE, replace it with numberFromBack
 *   then decrement numberFromBack
 * 
 * map the input array from right to left again, but for filling 0s in
 *   for each element, if it is -, replace it with numberFromFront
 *   then increment numberFromFront
 * 
 * return the the mapped version of the input array
 * 
 * time and space:
 * time, loop through the input array twice, so 2N, which is N
 * space: N
 */

export function makeJumbledArray(order) {
  let numberFromBack = order.length - 1;
  let numberFromFront = 0;
  let returnArr = order.reduceRight((mappedArray, sign) => {
    if (sign === '+' || sign === 'NONE') {
      mappedArray.unshift(numberFromBack--);
    } else {
      mappedArray.unshift(numberFromFront++);
    }
    return mappedArray;
  }, []);

  return returnArr;
}

describe('Make Jumbled Array', () => {
  it('Should return empty array for empty input array', () => {
    const order = [];
    expect(makeJumbledArray(order)).to.eql([]);
  });
  it('Should work with example', () => {
    const order = ['NONE', '+', '+', '-', '+'];
    expect(makeJumbledArray(order)).to.eql([1,2,3,0,4]);
  });
  it('Should return correctly for multiple - signs', () => {
    const order = ['NONE', '+', '+', '-', '-', '-', '+'];
    expect(makeJumbledArray(order)).to.eql([3,4,5,2,1,0,6]);
  });
});