/**
 * Queue via Stacks: Implement a MyQueue class which implements a queue using two stacks.
 * 
 * have two stacks: inStack and outStack
 * when pushing new values, push them into inStack
 * when removing value from the queue, popping from outStack,
 *  but if there is nothing in it, then take all the values from inStack and put them in
 *  the outStack, pop one and push one
 */

export class QueueByStacks {
    inStack: number[];
    outStack: number[];
    constructor() {
        this.inStack = [];
        this.outStack = [];
    }
    push(val) {
        this.inStack.push(val);
    }
    pop() {
        if (!this.outStack.length) {
            while(this.inStack.length) {
                this.outStack.push(this.inStack.pop());
            }
        }
        return this.outStack.pop();
    }
}
