/**
 * Remove Dups: Write code to remove duplicates from an unsorted linked list.
 * 
 * solution 1: allow to use cache to keep record of value frequency
 * use that to keep track of which value has more 1 frequency and remove it
 * 
 * looping through a linked list
 * set preNode to null
 * set curNode to linkedList's head
 * as long as curNode exists keep looping
 */

import { LinkedList } from './linkedLIst';

export function removeDupBufferOk(linkedList): LinkedList {
  const freqRecord = {};
  let previousNode = null;
  let curNode = linkedList.head;
  while(curNode) {
    // add value to freqRecord and check amount;
    const val = curNode.value;
    if (freqRecord[val]) {
      // connect the previous node to next node
      // set curNode.next to null;
      const nextNode = curNode.next;
      curNode.next = null;
      previousNode.next = nextNode;
      curNode = nextNode;
    } else {
      freqRecord[val] = true;
      previousNode = curNode;
      curNode = curNode.next;
    }
  }

  return linkedList;
}

describe('remove dups', () => {
  it('should return 1, 2, 3', () => {
    const list = new LinkedList();
    list.appendToTail(1);
    list.appendToTail(1);
    list.appendToTail(1);
    list.appendToTail(2);
    list.appendToTail(2);
    list.appendToTail(3);
    const result = removeDupBufferOk(list);
    const values = [];
    result.forEach(({ value }) => {
      values.push(value);
    });
    expect(values).to.eql([1,2,3]);
  });
  it('should return 1', () => {
    const list = new LinkedList();
    list.appendToTail(1);
    const result = removeDupBufferOk(list);
    const values = [];
    result.forEach(({ value }) => {
      values.push(value);
    });
    expect(values).to.eql([1]);
  });
});