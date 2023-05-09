/**
 * Loop Detection: Given a circular linked list, implement an algorithm that returns the node at the
 * beginning of the loop.
 * DEFINI TION
 * Circular linked list: A (corrupt) linked list in which a node's next pointer points to an earlier
 * node, so as to make a loop in the linked list.
 * EXAMPLE Input: A -) B -) C -) 0 -) E -) C[thesameCasearlierl Output: C
 * 
 * keep 2 pointers, one fast, one slow
 * if fast one got null, then it's not a circular list
 * if fast ever caught up to the slow one, it is a circular list
 */

export function isCircular (list1) {
    let slowNode = list1;
    let fastNode = (list1.next || { next: null }).next;
    while (fastNode && slowNode) {
        if (fastNode === slowNode) {
            return true;
        } else {
            slowNode = slowNode.next;
            fastNode = (fastNode.next || { next: null }).next;
        }
    }

    return false;
}

describe('is circular', () => {
    it('should return true', () => {
        const n1 = { next: null };
        const n2 = { next: null };
        const n3 = { next: null };
        const n4 = { next: null };
        const n5 = { next: null };
        n1.next = n2;
        n2.next = n3;
        n3.next = n4;
        n4.next = n5;
        n5.next = n1;
        expect(isCircular(n1)).to.equal(true);
    });
    it('should return false', () => {
        const n1 = { next: null };
        const n2 = { next: null };
        const n3 = { next: null };
        const n4 = { next: null };
        const n5 = { next: null };
        n1.next = n2;
        n2.next = n3;
        n3.next = n4;
        n4.next = n5;
        expect(isCircular(n1)).to.equal(false);
    });
})