import { LinkedList } from "./linkedLIst";

/**
 * Intersection: Given two (singly) linked lists, determine if the two lists intersect.
 * Return the intersecting node. Note that the intersection is defined based on
 * reference, not value. That is, if the kth node of the first linked list is the
 * exact same node (by reference) as the jth node of the second linked list, then they are intersecting.
 * 
 * solution 1:
 * well loop through both list and mutate all the node to have a checked state
 * whenever a node already has a checked state then they intersect and return true
 * else return false
 * 
 * time and space:
 * time you would have to go through the longest list
 * space you are adding new property to all the node worse
 * case it longest list * 2
 */

export function isIntersection(list1: LinkedList, list2: LinkedList): boolean {
  let nodeA = (list1.head as any);
  let nodeB = (list2.head as any);
  if (!nodeA || !nodeB) {
    return false;
  }
  while (nodeA) {
    if(nodeA.isVisited) {
      return true;
    }
    nodeA.isVisited = true;
    nodeA = nodeA.next;
  }

  while (nodeB) {
    if(nodeB.isVisited) {
      return true;
    }
    nodeB.isVisited = true;
    nodeB = nodeB.next;
  }
  return false;
}

describe('intersection', () => {
  it('should return true for 12345 and 883', () => {
    const list1 = new LinkedList();
    list1.appendToTail(1);
    list1.appendToTail(2);
    list1.appendToTail(3);
    list1.appendToTail(4);
    list1.appendToTail(5);

    const list2 = new LinkedList();
    list2.appendToTail(8);
    list2.appendToTail(8);
    list2.head.next.next = list1.head.next.next;
    const list2Vals = list2.mapToArray(({ value }) => value);
    expect(list2Vals).to.eql([8, 8, 3, 4, 5]);
    expect(isIntersection(list1, list2)).to.be.true;
  });
  it('should return false for 12345 and 889', () => {
    const list1 = new LinkedList();
    list1.appendToTail(1);
    list1.appendToTail(2);
    list1.appendToTail(3);
    list1.appendToTail(4);
    list1.appendToTail(5);

    const list2 = new LinkedList();
    list2.appendToTail(8);
    list2.appendToTail(8);
    list2.appendToTail(9);
    expect(isIntersection(list1, list2)).to.be.false;
  });
});