import { LinkedList } from "./linkedList";

/**
 * Loop Detection: Given a circular linked list, implement an algorithm that returns the node at the
  beginning of the loop.
  DEFINI TION
  Circular linked list: A (corrupt) linked list in which a node's next pointer points to an earlier node, so as to make a loop in the linked list.
  EXAMPLE
  Input: A -) B -) C -) 0 -) E -) C[thesameCasearlierl Output: C

    solution 1:
    mark all nodes as you loop through one node at the time
    anytime you found a already visited node, return that node

    solution 2:
    use the runner technique:
 *  use two runner, one faster one slow, if any time the slow one is same as the
 *  fast one, that means there a loop
 */

export function findLoop(list) {
  let slow = list.head;
  let fast = list.head;
  let keepLooping = true;
  while(keepLooping && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      keepLooping = false;
    }
  }

  // collision found
  if (!keepLooping) {
    slow = list.head;
    while(slow !== fast) {
      slow = slow.next;
      fast = fast.next;
    }
    return slow;
  } else {
    return null;
  }
}

describe('loop detection', () => {
  it('should detect loop', () => {
    const list = new LinkedList();
    list.appendToTail(1);
    list.appendToTail(2);
    list.appendToTail(3);
    list.appendToTail(4);
    list.appendToTail(5);
    list.appendToTail(6);
    const lastNode = list.getNthNode(6);
    const thirdNode = list.getNthNode(3);
    lastNode.next = thirdNode;
    expect(findLoop(list)).to.equal(thirdNode);
  });
  it('should not detect loop', () => {
    const list = new LinkedList();
    list.appendToTail(1);
    list.appendToTail(2);
    list.appendToTail(3);
    list.appendToTail(4);
    list.appendToTail(5);
    list.appendToTail(6);
    expect(findLoop(list)).to.equal(null);
  });
  it('should not detect loop', () => {
    const list = new LinkedList();
    expect(findLoop(list)).to.equal(null);
  });
});