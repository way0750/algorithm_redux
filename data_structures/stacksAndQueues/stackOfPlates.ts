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
 * remember to update total length, and when you removing from a specific stack
 * and it is already empty, don't update total length!
 * 
 * time and space
 * 
 * time: adding removing constant
 * space: n as in the total amount of elements in the store
 */

