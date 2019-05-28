/**
 * Recursive Multiply: Write a recursive function to multiply
 * two positive integers without using the * operator. You can
 * use addition, subtraction, and bit shifting, but you should
 * minimize the number of those operations.
 * 
 * solution 1:
 * if input is 4*9 it is the same as 4*4 + 4*4 + 4 * 1
 * so now you can recursively trying to solve 4*4
 * then 4 * 4 is same as 4 * 2 + 4 * 2 + 4 * 0
 * then recursively call 4 * 2 that can be a base case: anything times
 * 2 is just self + self
 * or another basecase: if *1 then self, if *0 then 0;
 * 
 * base case: if multiplier is
 *   2: return self + self
 *   1: return self
 *   0; return 0;
 * what to always return: the product
 * what to do with the return: product + product + self * (multiplier % 2);
 * how to make problem smaller
 *   get new multiplier by oldMultiplier/2 and then floor it
 *   pass num and new multiplier to next function call
 * 
 * time and space
 * time: you keep halving halving and halving so see that as a upside down
 * binary tree. logN, N is the multiplier
 * space logN, that's the 'depth' of the tree, the size of the recursive stack
 * will use
 */

export function recursiveMultiple(base, multiplier) {
  if (multiplier === 2) {
    return base + base;
  } else if (multiplier === 1) {
    return base;
  } else if (multiplier === 0) {
    return 0;
  }
  const newMultiplier = Math.floor(multiplier / 2);
  let subProduct = recursiveMultiple(base, newMultiplier);
  subProduct += subProduct;
  return subProduct + (multiplier % 2 === 0 ? 0 : base);
}

describe('Recursive Multiple', () => {
  it('should return 0', () => {
    const base = 9;
    const multiplier = 0;
    expect(recursiveMultiple(base, multiplier)).to.eql(0);
  });
  it('should return 9', () => {
    const base = 9;
    const multiplier = 1;
    expect(recursiveMultiple(base, multiplier)).to.eql(9);
  });
  it('should return 81', () => {
    const base = 9;
    const multiplier = 9;
    expect(recursiveMultiple(base, multiplier)).to.eql(81);
  });
});