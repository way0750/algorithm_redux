// Given two singly linked lists that intersect at some point, find the intersecting node. The lists are non-cyclical.
// For example, given A = 3 -> 7 -> 8 -> 10 and B = 99 -> 1 -> 8 -> 10, return the node with value 8.
// In this example, assume nodes with the same value are the exact same node objects.
// Do this in O(M + N) time (where M and N are the lengths of the lists) and constant space.

/**
 * You can mutate the data structure and adding something like visited to each node in the first link list
 * then loop through the second one and see if any node has already been visited, if yes, then return true
 * 
 * But mutating input is bad, so another way to do it is comparing nodes from two lists see if that they are
 * the same node.
 * But the lists can be of different lengths, so have two pointers to pick nodes, but move the pointers
 * from the longer one forward first until both pointers are the same distance to their respective end
 */

export function getLinkListLength(list): number {
  let count = 0;
  let curNode = list;
  while(curNode) {
    count++;
    curNode = curNode.next;
  }
  return count;
}

function isIntersecting(list1, list2): boolean {
  const list1Length = getLinkListLength(list1);
  const list2Length = getLinkListLength(list2);
  let lengthToShorten = Math.abs(list1Length - list2Length);
  while(lengthToShorten) {
    if (list1Length > list2Length) {
      list1 = list1.next;
    } else if (list2Length > list1Length) {
      list2 = list2.next;
    }
    lengthToShorten--;
  }

  while(list1 && list2) {
    if (list1 === list2) {
      return true;
    } else {
      list1 = list1.next;
      list2 = list2.next;
    }
  }

  return false;
}

describe('intersecting link lists', () => {
  it('should return false for two empty lists', () => {
    const list1 = null;
    const list2 = null;
    expect(isIntersecting(list1, list2)).to.be.false;
  });

  it('should return true for two same length lists', () => {
    const sameNode = { value: 2, next: null };
    const list1 = { value: 1, next: sameNode };
    const list2 = { value: 33, next: sameNode };
    expect(isIntersecting(list1, list2)).to.be.true;
  });

  it('should return false for two same length lists', () => {
    const list1 = { value: 1, next: { value: 3, next: null } };
    const list2 = { value: 33, next: { value: 3, next: null } };
    expect(isIntersecting(list1, list2)).to.be.false;
  });

  it('should return false for two different length lists', () => {
    const sameNode = { value: 999, next: null };
    const list1 = { value: 1, next: { value: 3, next: { value: 4, next: sameNode } } };
    const list2 = { value: 33, next: { value: 3, next: sameNode } };
    expect(isIntersecting(list1, list2)).to.be.true;
  });
});