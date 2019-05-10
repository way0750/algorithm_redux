/**
 * Write a program to sort a stack such that the smallest items are on the top.
 * You can use an additional temporary stack, but you may not copy the elements
 * into any other data structure (such as an array). The stack supports the
 * following operations: push, pop, peek, and isEmpty.
 * 
 * basically like merge sort you compare two arrays and pick the smaller one to
 * put into yet another array
 * 
 * solution 1:
 * set 3 stacks to make things easier
 * the input one s1, then s2 and s3
 * 
 * while s1 is not empty keep looping
 *   peek s1 and s2 (it can be empty), and push the smaller or equal one to s2
 *   if the peek value from s1 larger, push it to s3
 *   while s3 is not empty
 *     peek s2 and s3 and push the smaller or equal size value to s1
 * 
 * at the very end pop all values from s2 and push them into s1
 */