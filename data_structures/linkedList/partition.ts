/**
 * Partition: Write code to partition a linked list around a value x,
 * such that all nodes less than x come before all nodes greater than or equal to x.
 * lf x is contained within the list, the values of x only need to be after the elements
 * less than x (see below).The partition element x can appear anywhere in the "right
 * partition"; it does not need to appear between the left and right partitions.
  94
  Cracking the Coding Interview, 6th Edition
  EXAMPLE
 * Input: 3 -> 5 -> 8 -> 5 ->10 -> 2 -> 1[partition=5) Output: 3 -> 1 -> 2 -> 10
 * -> 5 -> 5 -> 8
    solution 1:
    have two pointers:
    swappableNode and runner
    set both to the head node first
    while runner then
    check if runner.value is smaller than input n
    if yes then swap value with swappableNode
      then set runner to runner.next
    check if swappableNode value is smaller than input n
      if yes, then take .next

    return void for this
 */

import { LinkedList } from './linkedList';
export function partition(list, n) {
  let swappableNode = list.head;
  let runner = list.head;
  while (runner) {
    if(runner.value < n) {
      const runnerValue = runner.value;
      runner.value = swappableNode.value;
      swappableNode.value = runnerValue;
    }
    runner = runner.next;
    if (swappableNode.value < n) {
      swappableNode = swappableNode.next;
    }
  }
}

describe('partition', () => {
  it('should return 3 2 1 5 10 5 8 for 3 5 8 5 10 2 1', () => {
    const list = new LinkedList();
    list.appendToTail(3);
    list.appendToTail(5);
    list.appendToTail(8);
    list.appendToTail(5);
    list.appendToTail(10);
    list.appendToTail(2);
    list.appendToTail(1);
    partition(list, 5);
    const result = list.mapToArray(({ value }) => value);
    expect(result).to.eql([3,2,1,5,10,5,8]);
  });
  it('should return 3 5 8 5 10 2 1 for 3 5 8 5 10 2 1', () => {
    const list = new LinkedList();
    list.appendToTail(3);
    list.appendToTail(5);
    list.appendToTail(8);
    list.appendToTail(5);
    list.appendToTail(10);
    list.appendToTail(2);
    list.appendToTail(1);
    partition(list, 50);
    const result = list.mapToArray(({ value }) => value);
    expect(result).to.eql([3, 5, 8, 5, 10, 2, 1]);
  });
  it('should return 3 5 8 5 10 2 1 for 3 5 8 5 10 2 1', () => {
    const list = new LinkedList();
    list.appendToTail(3);
    list.appendToTail(5);
    list.appendToTail(8);
    list.appendToTail(5);
    list.appendToTail(10);
    list.appendToTail(2);
    list.appendToTail(1);
    partition(list, 0);
    const result = list.mapToArray(({ value }) => value);
    expect(result).to.eql([3, 5, 8, 5, 10, 2, 1]);
  });
});