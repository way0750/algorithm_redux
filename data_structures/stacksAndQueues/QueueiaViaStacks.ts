import { Stack } from "./stack";

/**
 * Implement a MyQueue class which implements a queue using two stacks.
 * 
 * solution 1:
 * queue when adding you add to the back,
 * but when popping you pop from front
 * so you can unload all the values from one stack onto the second one, and then
 * all the values are ordered in a way that the front queue values are in the
 * back of the stack which is safe to pop
 * whenever the second stack is not empty, pop from it first
 * if it is empty, unload all the values from first stack to second stack, then
 * pop
 * whenever you add, you add to the first stack
 */

export class MyQueue {
  private stack1: Stack = new Stack;
  private stack2: Stack = new Stack;
  private totalLength: number = 0;

  public push(val) {
    this.stack1.push(val);
    this.totalLength++;
    return true;
  }

  public pop() {
    // if stack2 is empty get values from stack1
    if (this.stack2.isEmpty()) {
      while(this.stack1.isEmpty() === false) {
        this.stack2.push(this.stack1.pop());
      }
    }

    // then check is stack2 is still emtpy
    // if not, then pop
    // if yes, then return undefined
    if(this.stack2.isEmpty()) {
      return undefined;
    } else {
      this.totalLength--;
      return this.stack2.pop();
    }
  }

  public length() {
    return this.totalLength;
  }
}

describe('Queue via Stacks', () => {
  it('should add new values', () => {
    const q = new MyQueue();
    q.push(1);
    q.push(2);
    q.push(3);
    q.push(4);
    expect(q.length()).to.eql(4);
  });
  it('should pop values', () => {
    const q = new MyQueue();
    q.push(1);
    q.push(2);
    q.push(3);
    q.push(4);
    let pv = q.pop();
    expect(q.length()).to.eql(3);
    expect(pv).to.eql(1);
    pv = q.pop();
    expect(pv).to.eql(2);
  });
});