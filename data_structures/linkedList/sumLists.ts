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
  }

  if (carryOver) {
    sumList.appendToTail(1);
  }

  return sumList;
}