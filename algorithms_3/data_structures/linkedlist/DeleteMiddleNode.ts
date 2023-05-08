/**
 * Delete Middle Node: Implement an algorithm to delete a node in the middle (i.e.,
 * any node but the first and last node, not necessarily the exact middle) of a singly linked list,
 * given only access to that node.  EXAMPLE
 * Input: the node c from the linked list a - >b- >c - >d - >e- >f
 * Result: nothing is returned, but the new linked list looks like a - >b- >d - >e- >f
 * if there is on head.next or head.next.next
 * then just return the linkedlist
 * else set slowNode to head, fastNode to head.next.next
 * and set prevNode = null
 * keep whileLooping until fastNode is null
 * in each loop advance check if
 *  always check fastNode.next is null then remove the current slowNode
 *  if no fastNode.next.next then set fastNode to { next: null }
 *      (so the deletion happens the next loop)
 *  prevNode to slowNode then slowNode to slowNode.next
 *  1 2 3 4
 */

export function deleteMiddleNode (linkedList) {
    if (!linkedList.next || !linkedList.next.next) {
        return linkedList;
    }
    let preNode = null;
    let slowNode = linkedList;
    let fastNode = linkedList.next;
    while (fastNode) {
        preNode = slowNode;
        slowNode = slowNode.next;
        fastNode = fastNode.next && fastNode.next.next ? fastNode.next.next : null;
        if (!fastNode) {
            preNode.next = slowNode.next;
            slowNode.next = null;
        }
    }

    return linkedList;
}

describe('delete middle node', () => {
    it('should delete the middle node', () => {
        const n1 = { value: 1, next: null };
        const n2 = { value: 2, next: null };
        const n3 = { value: 3, next: null };
        const n4 = { value: 4, next: null };
        const n5 = { value: 5, next: null };
        n1.next = n2;
        n2.next = n3;
        n3.next = n4;
        n4.next = n5;
        deleteMiddleNode(n1);
        expect(n2.next).to.equal(n4);
    });
    it('should delete the right middle node', () => {
        const n1 = { value: 1, next: null };
        const n2 = { value: 2, next: null };
        const n3 = { value: 3, next: null };
        const n4 = { value: 4, next: null };
        n1.next = n2;
        n2.next = n3;
        n3.next = n4;
        deleteMiddleNode(n1);
        expect(n2.next).to.equal(n4);
    });
});