/**
 * Return Kth to Last: Implement an algorithm to find the kth to last element of a singly linked list.
 * 
 * 1: run throught the list twice, first run to find the length, second run to find the kth to last element
 * time: O(n), space: O(1);
 * 2: recursion: keep tracking the depth until hitting the last node
 *  as you recursively call you pass down a cache object to communicate with lower stack
 *  at the last node, you set cache.length = linkedlist length
 *  then at each call, you compare current stack index to the length to k to see if you are at k
 *  if index > kth, return null
 *  if index = kth, return self
 *  if index < kth, return what you got from lower stack
 */

export function returnKthToLast (linkedlist, kth, cache = { length: null }, currentStack = 1) {
    if (!linkedlist) {
        cache.length = currentStack;
        return null;
    }
    // get target rank
    const returnedNode = returnKthToLast(linkedlist.next, kth, cache, currentStack + 1);
    const targetRank = cache.length - kth;
    if (currentStack === targetRank) {
        return linkedlist;
    } else if (currentStack > targetRank) {
        return null;
    } else {
        return returnedNode;
    }
}

describe('return kth to last', () => {
    it('should return 2nd to last', () => {
        const n1 = { value: 1, next: null };
        const n2 = { value: 2, next: null };
        const n3 = { value: 3, next: null };
        const n4 = { value: 4, next: null };
        n1.next = n2;
        n2.next = n3;
        n3.next = n4;
        expect(returnKthToLast(n1, 2)).to.equal(n3);
    });
});