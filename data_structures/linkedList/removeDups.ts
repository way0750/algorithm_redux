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
 * 
 * time and space:
 * time: loop through once so n
 * space: worst case you end up with all unique values, so n again
 * 
 * solution 2: not allow to use buffer to keep frequency record:
 * compare all subsequent value to current node and remove the duplicated ones
 * time and space:
 * time: n**2
 * space: you are not using extra space so constant
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

export function removeDupNoBuffer(list): LinkedList {
  let currentNode = list.head;
  while(currentNode) {
    let previousNode = currentNode;
    let runner = currentNode.next;
    while(runner) {
      if(runner.value === currentNode.value) {
        previousNode.next = runner.next;
      } else {
        previousNode = runner;
      }
      runner = runner.next;
    }

    currentNode = currentNode.next;
  }

  return list;
}

describe('remove dups buffer ok', () => {
  it('should return 1, 2, 3', () => {
    const list = new LinkedList();
    list.appendToTail(1);
    list.appendToTail(1);
    list.appendToTail(2);
    list.appendToTail(1);
    list.appendToTail(2);
    list.appendToTail(3);
    const result = removeDupBufferOk(list);
    const values = result.mapToArray(({ value }) => value);
    expect(values).to.eql([1,2,3]);
  });
  it('should return 1', () => {
    const list = new LinkedList();
    list.appendToTail(1);
    const result = removeDupBufferOk(list);
    const values = result.mapToArray(({ value }) => value);
    expect(values).to.eql([1]);
  });
});

describe('remove dups no bugger', () => {
  it('should return 1, 2, 3', () => {
    const list = new LinkedList();
    list.appendToTail(1);
    list.appendToTail(1);
    list.appendToTail(2);
    list.appendToTail(1);
    list.appendToTail(2);
    list.appendToTail(3);
    const result = removeDupNoBuffer(list);
    const values = result.mapToArray(({ value }) => value);
    expect(values).to.eql([1,2,3]);
  });
  it('should return 1', () => {
    const list = new LinkedList();
    list.appendToTail(1);
    const result = removeDupNoBuffer(list);
    const values = result.mapToArray(({ value }) => value);
    expect(values).to.eql([1]);
  });
});