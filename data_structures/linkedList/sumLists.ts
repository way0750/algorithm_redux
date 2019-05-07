/**
 * Sum Lists: You have two numbers represented by a linked list, where each node contains a single digit.
 * The digits are stored in reverse order, such that the 1's digit is at the head of the list.
 * Write a function that adds the two numbers and returns the sum as a linked list.
  EXAMPLE
  Input: (7-) 1 -) 6) + (5 -) 9 -) 2).Thatis,617 + 295. Output: 2 -) 1 -) 9.That is, 912.
  FOLLOW UP
  Suppose the digits are stored in forward order. Repeat the above problem. EXAMPLE
 * Input: (6 -) 1 -) 7) + (2 -) 9 -) 5).Thatis,617 + 295. Output: 9 -) 1 -)
 * 2.That is, 912.
  
 solution 1
 * well just create a new linked list and keep the sum of two nodes of same
 * position to that new node to the new linked list
 * but of course you have to keep track of carry over
 * so at the end add one more node if there is carry over left
 */

import { LinkedList } from './linkedList';
export function sumLists(list1, list2): LinkedList {
  const sumList = new LinkedList();
  let carryOver = 0;
  while (list1 || list2) {
    list1 = list1 || { value: 0, next: null };
    list2 = list2 || { value: 0, next: null };
    const sum = list1.value + list2.value + carryOver;
    sumList.appendToTail(sum % 10);
    carryOver = Math.floor(sum/10);
    list1 = list1.next;
    list2 = list2.next;
  }

  if (carryOver) {
    sumList.appendToTail(1);
  }

  return sumList;
}

describe('sum lists', () => {
  it('should return 2 1 9 for 7 1 6 + 5 9 2', () => {
    const list1 = new LinkedList();
    list1.appendToTail(7);
    list1.appendToTail(1);
    list1.appendToTail(6);
    const list2 = new LinkedList();
    list2.appendToTail(5);
    list2.appendToTail(9);
    list2.appendToTail(2);

    const sumList = sumLists(list1.head, list2.head);
    const result = sumList.mapToArray(({ value }) => value);
    expect(result).to.eql([2,1,9]);
  });
  it('should return 7 8 8 1 for 999 + 888', () => {
    const list1 = new LinkedList();
    list1.appendToTail(9);
    list1.appendToTail(9);
    list1.appendToTail(9);
    const list2 = new LinkedList();
    list2.appendToTail(8);
    list2.appendToTail(8);
    list2.appendToTail(8);

    const sumList = sumLists(list1.head, list2.head);
    const result = sumList.mapToArray(({ value }) => value);
    expect(result).to.eql([7,8,8,1]);
  });
  it('should return 7 8 8 0 1 for 9999 + 888', () => {
    const list1 = new LinkedList();
    list1.appendToTail(9);
    list1.appendToTail(9);
    list1.appendToTail(9);
    list1.appendToTail(9);
    const list2 = new LinkedList();
    list2.appendToTail(8);
    list2.appendToTail(8);
    list2.appendToTail(8);

    const sumList = sumLists(list1.head, list2.head);
    const result = sumList.mapToArray(({ value }) => value);
    expect(result).to.eql([7,8,8,0,1]);
  });
});