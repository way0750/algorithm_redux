import { Stack } from "./stack";

/**
 * Stack Min: How would you design a stack which, in addition to push and pop
 * has a function min which returns the minimum element? Push, pop and min should all operate in 0(1) time.
 * 
 * solution:
 * just use two normal stacks
 * one to keep values
 * one to keep track of current min at each index. You just need to add min
 * value each time you add anything. then simply pop as you pop normal stack.
 * 
 * time and space:
 * time: adding and getting min? constant
 * 
 * space: same length of the value stack: n
 */

export class StackMin {
  private store: Stack = new Stack();
  private mins: Stack = new Stack();
  
  public push(val) {
    this.store.push(val);
    if (this.mins.isEmpty()) {
      this.mins.push(val);
    } else {
      const newMin = Math.min(this.mins.peek(), val);
      this.mins.push(newMin);
    }
  }

  public pop() {
    this.mins.pop();
    return this.store.pop();
  }
}

