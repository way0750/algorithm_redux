import { Stack } from "./stack";

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

export function sortStack(s1: Stack): Stack {
  const s2 = new Stack();
  const s3 = new Stack();
  while(!s1.isEmpty()) {
    const s1Peek = s1.peek();
    let s2Peek = s2.peek();
    if (s2.isEmpty() || s1Peek <= s2Peek) {
      s2.push(s1.pop());
    } else {
      s3.push(s1.pop());
    }

    while(!s3.isEmpty()) {
      s2Peek = s2.peek();
      const s3Peek = s3.peek();
      if (s2Peek < s3Peek) {
        s1.push(s2.pop());
      } else {
        s1.push(s3.pop());
      }
    }
  }
  while (!s2.isEmpty()) {
    s1.push(s2.pop());
  }

  return s1;
}

describe('Sort Stack', () => {
  it('should return sorted 1', () => {
    const s = new Stack();
    s.push(4);
    s.push(3);
    s.push(5);
    s.push(1);
    const result = sortStack(s);
    expect((result as any).store).to.eql({0: 1, 1: 3, 2: 4, 3: 5});
  });
  it('should return sorted 2', () => {
    const s = new Stack();
    s.push(4);
    s.push(3);
    s.push(5);
    s.push(1);
    s.push(81);
    s.push(111);
    const result = sortStack(s);
    expect((result as any).store).to.eql({0: 1, 1: 3, 2: 4, 3: 5, 4: 81, 5: 111});
  });
});