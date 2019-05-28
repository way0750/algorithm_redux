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
 */