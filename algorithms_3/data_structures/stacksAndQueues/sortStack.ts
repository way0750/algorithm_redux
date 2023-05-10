/**
 * Sort Stack: Write a program to sort a stack such that the smallest items are on the top.
 * You can use an additional temporary stack, but you may not copy the elements into any other data
 * structure (such as an array). The stack supports the following operations: push, pop, peek, and
 * isEmpty.
 * 
 * have two stacks
 * values: []
 * temp: []
 * keep on pushing values to values[]
 *  also compare before puttting it in
 *  if value is larger than the top stack val
 *    then keep on popping values out and put into the temp one until reaching either the end or
 *      reaching a value that is bigger
 *      then push the new val into the values[], then push all the value from temp[] back to the values
 */
