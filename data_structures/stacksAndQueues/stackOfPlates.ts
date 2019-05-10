import { Stack } from "./stack";

/**
 * Stack of Plates: Imagine a (literal) stack of plates. If the stack gets too high,
 * it might topple. Therefore, in real life, we would likely start a new stack when
 * the previous stack exceeds some threshold. Implement a data structure SetOfStacks
 * that mimics this. SetOfStacks should be composed of several stacks and should create
 * a new stack once the previous one exceeds capacity. SetOfStacks. push () and SetOfStacks.
 * pop () should behave identically to a single stack (that is, pop ( ) should return
 * the same values as it would if there were just a single stack). FOLLOW UP Implement
 * a function popAt(int index) which performs a pop operation on a specific sub-stack.
 * 
 * solution 1:
 * use an Array to hold stacks, then each time you add, you check and see if the
 * very last one can still accept new values, if yes, add to that stack, if no,
 * then create new stack then add to that stack
 * 
 * for removing, get the target stack which is default to the very last one
 * unless the user asks for specific stack by index.
 * if a stack exists at that index, then remove from the top
 * if that stack doesn't exist, then return undefined;
 * 
 * time and space
 * 
 * time: adding removing constant
 * space: n as in the total amount of elements in the store
 */

export class SetOfStacks {
  // to keep track of length of all elements, but will have a method to return
  // this so user can't mutate it
  private totalLength: number = 0;
  private store: Array<Stack> = [new Stack()];
  private stackLimit: number = 0;
  constructor(stackLimit = 5) {
    this.stackLimit = stackLimit;
  }

  public push (value) {
    let lastStack = this.store[this.store.length - 1];
    if(lastStack.length() < this.stackLimit) {
      lastStack.push(value);
    } else {
      lastStack = new Stack();
      lastStack.push(value);
      this.store.push(lastStack);
    }

    this.totalLength++;
  }

  public length() {
    return this.totalLength;
  }

  public popAt(stackId = this.store.length - 1) {
    // stackId has to be within the valid interval
    // from 0...store length(exclusive)
    if (stackId >= this.store.length || stackId < 0) {
      return undefined;
    }

    const targetStack = this.store[stackId];
    if (targetStack.isEmpty()) {
      this.store.splice(stackId, 1);
      return undefined;
    } else {
      const poppedVal = targetStack.pop();
      this.totalLength--;
      // to handle the last stack being empty after popping
      // so if right this round popping, if the user wants to pop again
      // we will pop from 2nd to last stack
      if (targetStack.isEmpty) {
        this.store.splice(stackId, 1);
      }
      return poppedVal;
    }
  }

  public pop() {
    return this.popAt(this.store.length - 1);
  }
}
