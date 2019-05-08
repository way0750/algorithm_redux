import { LinkedList } from "./linkedLIst";

/**
 * Intersection: Given two (singly) linked lists, determine if the two lists intersect.
 * Return the intersecting node. Note that the intersection is defined based on
 * reference, not value. That is, if the kth node of the first linked list is the
 * exact same node (by reference) as the jth node of the second linked list, then they are intersecting.
 * 
 * solution 1:
 * well loop through both list and mutate all the node to have a checked state
 * whenever a node already has a checked state then they intersect and return
 * that node
 * else return null
 * 
 * time and space:
 * time you would have to go through the longest list
 * space you are adding new property to all the node worse
 * case it longest list * 2
 */

export function getIntersection(list1: LinkedList, list2: LinkedList): boolean {
  let nodeA = (list1.head as any);
  let nodeB = (list2.head as any);
  if (!nodeA || !nodeB) {
    return null;
  }
  while (nodeA) {
    if(nodeA.isVisited) {
      return nodeA;
    }
    nodeA.isVisited = true;
    nodeA = nodeA.next;
  }

  while (nodeB) {
    if(nodeB.isVisited) {
      return nodeB;
    }
    nodeB.isVisited = true;
    nodeB = nodeB.next;
  }
  return null;
}

/**
 * solution 2:
 * find length of both lists and shorten the longer one
 * when loop through list from the same pos where the distance is the same to
 * respective ends
 * 
 * the first node that is the same, return it
 * 
 * time and space
 * time: loop to find length of both, worst case: longest list = n so n * 2
 *   then loop again to find intersection. so total of n * 3. 
 * space: constant, you just need to maintain a few piece of state that doesn't
 * increase in size with the length of the lists.
 */
function getIntersectionNoMarking(list1: LinkedList, list2: LinkedList) {
  // assuming we don't have convenient methods to get length in constant time
  let list1Length = 0;
  list1.forEach(() => list1Length++);
  let list2Length = 0;
  list2.forEach(() => list2Length++);
  let nodeLongList;
  let nodeShortList;
  if (list1Length !== list2Length) {
    let lengthDiff = Math.abs(list1Length - list2Length);
    if (list1Length > list2Length) {
      nodeLongList = list1.head;
      nodeShortList = list2.head;
    } else {
      nodeLongList = list2.head;
      nodeShortList = list1.head;
    }
    while(lengthDiff--) {
      nodeLongList = nodeLongList.next;
    }
  }

  const minLength = Math.min(list1Length, list2Length);
  for(let i = 0; i < minLength; i++) {
    if (nodeLongList === nodeShortList) {
      return nodeLongList;
    }
    nodeLongList = nodeLongList.next;
    nodeShortList = nodeShortList.next;
  }

  return null;
}

describe('intersection', () => {
  it('should return true for 12345 and 883', () => {
    const list1 = new LinkedList();
    list1.appendToTail(1);
    list1.appendToTail(2);
    list1.appendToTail(3);
    list1.appendToTail(4);
    list1.appendToTail(5);

    const list1ThirdNode = list1.head.next.next;

    const list2 = new LinkedList();
    list2.appendToTail(8);
    list2.appendToTail(8);
    list2.head.next.next = list1ThirdNode;
    const list2Vals = list2.mapToArray(({ value }) => value);
    expect(list2Vals).to.eql([8, 8, 3, 4, 5]);
    expect(getIntersection(list1, list2)).to.equal(list1ThirdNode);
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
    expect(getIntersection(list1, list2)).to.equal(null);
  });
});

describe('intersection without marking', () => {
  it('should return true for 12345 and 8345', () => {
    const list1 = new LinkedList();
    list1.appendToTail(1);
    list1.appendToTail(2);
    list1.appendToTail(3);
    list1.appendToTail(4);
    list1.appendToTail(5);

    const list1ThirdNode = list1.head.next.next;

    const list2 = new LinkedList();
    list2.appendToTail(8);
    list2.head.next = list1ThirdNode;
    const list2Vals = list2.mapToArray(({ value }) => value);
    expect(list2Vals).to.eql([8, 3, 4, 5]);
    expect(getIntersectionNoMarking(list1, list2)).to.equal(list1ThirdNode);
  });

  it('should return null for 12345 and 889', () => {
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
    expect(getIntersectionNoMarking(list1, list2)).to.equal(null);
  });
});