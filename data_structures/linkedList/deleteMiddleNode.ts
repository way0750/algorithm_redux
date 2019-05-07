/**
 * Delete Middle Node: Implement an algorithm to delete a node in the
 * middle (i.e., any node but the first and last node, not necessarily the exact middle)
 * of a singly linked list, given only access to that node.
  EXAMPLE
  Input: the node c from the linked list a - >b- >c - >d - >e- >f
 * Result: nothing is returned, but the new linked list looks like a - >b- >d -
 * >e- >f
  
 solution 1:
 * use the 2 pointer method: A goes node by node, B always go two nodes by two
 * nodes
 this way you will be able to to find the middle node
 set previousNode to null
 set nodeA to list.head
 set nodeB to nodeA.next
 while nodeB and nodeB.next, loop:
   previousNode = nodeA;
   nodeA = nodeA.next;
   nodeB = nodeB.next.next;
  
  when done, then nodeA would be pointing to the middle or almost middle node
  // found middle node that is not the first/head node
  if (previousNode) {
    previousNode.next = nodeA.next;
  }
  return nothing;

  time and space:
  time: you will go through half of all nodes so 1/2N which is N
  space: constant space anyway
 */

import { LinkedList } from './linkedList';

export function deleteMiddleNode(list: LinkedList): void {
  let previousNode = null;
  let nodeA = list.head;
  let nodeB = nodeA ? nodeA.next: null;
  while (nodeB && nodeB.next) {
    previousNode = nodeA;
    nodeA = nodeA.next;
    nodeB = nodeB.next ? nodeB.next.next : null;
  }

  if (previousNode) {
    previousNode.next = nodeA.next;
  }
}

describe('delete middle node', () => {
  it('should turn 1, 2, 3 to 1, 3', () => {
    const list = new LinkedList();
    list.appendToTail(1);
    list.appendToTail(2);
    list.appendToTail(3);
    deleteMiddleNode(list);
    const result = list.mapToArray(({ value }) => value );
    expect(result).to.eql([1,3]);
  });
  it('should turn 1, 2, 3, 4 to 1, 3, 4', () => {
    const list = new LinkedList();
    list.appendToTail(1);
    list.appendToTail(2);
    list.appendToTail(3);
    list.appendToTail(4);
    deleteMiddleNode(list);
    const result = list.mapToArray(({ value }) => value );
    expect(result).to.eql([1,3,4]);
  });
  it('should not delete head and tail', () => {
    const list = new LinkedList();
    list.appendToTail(1);
    list.appendToTail(2);
    deleteMiddleNode(list);
    const result = list.mapToArray(({ value }) => value );
    expect(result).to.eql([1,2]);
  });
  it('should not delete head and tail', () => {
    const list = new LinkedList();
    deleteMiddleNode(list);
    const result = list.mapToArray(({ value }) => value );
    expect(result).to.eql([]);
  });
});