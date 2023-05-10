/**
 * Sort Stack: Write a program to sort a stack such that the smallest items are on the top.
 * You can use an additional temporary stack, but you may not copy the elements into any other data
 * structure (such as an array). The stack supports the following operations: push, pop, peek, and
 * isEmpty.
 * 
 * set smallVal to null;
 * while stack.length do:
 *  pop one value from stack, save it at smallVal
 *  compare smallVal to tempStack, if bigger then push smallVal to tempStack
 *      if smaller, then do another while loop, while the last value in tempStack is
 *          larger than smallValue, pop tempStack one at the time and place into Stack
 *          once found the last value is smaller than smallValue or end of tempStack
 *          push smallValue into the temp stack
 *   continue the outter while loop
 * eventually the Stack is empty
 *  then while loop to pop and push each value from tempStack back into the Stack
 * 
 * time: O(n^2) space: O(n)
 */

export function sortStack(stack) {
    const tempStack = []
    while(stack.length) {
        let curVal = stack.pop();
        let lastTempVal = tempStack.length ? tempStack[tempStack.length - 1] : -Infinity;
        while (curVal < lastTempVal) {
            stack.push(tempStack.pop());
            lastTempVal = tempStack.length ? tempStack[tempStack.length - 1] : -Infinity;
        }
        tempStack.push(curVal);
    }

    while(tempStack.length) {
        stack.push(tempStack.pop());
    }

    return stack;
}

describe('sort stack', () => {
    it('should sort an already sorted array in acending order', () => {
        const stack = [1,2,3,4,5,6,7,8,9];
        const expected = [1,2,3,4,5,6,7,8,9].reverse();
        expect(sortStack(stack).toString()).to.equal(expected.join());
    });
});