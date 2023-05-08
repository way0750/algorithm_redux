/**
 * Remove Dups: Write code to remove duplicates from an unsorted linked list.
 * 
 * so just maintain a cache to keep track of values you have encountered
 * then remove duplicated one as you run into them
 * time: O(n), space: O(n);
 */

export function removeDup (linkedList, cache = {}) {
    if (!linkedList) {
        return linkedList;
    }
    if (cache[linkedList.value]) {
        return removeDup(linkedList.next, cache);
    } else {
        cache[linkedList.value] = true;
        linkedList.next = removeDup(linkedList.next, cache);
        return linkedList;
    }
}

describe('reove dups', () => {
    it('should not remove anything', () => {
        const n1 = { value: 1, next: null };
        const n2 = { value: 2, next: null };
        const n3 = { value: 3, next: null };
        const n4 = { value: 4, next: null };
        n1.next = n2;
        n2.next = n3;
        n3.next = n4;
        removeDup(n1);
        expect(n1.next).to.equal(n2);
        expect(n2.next).to.equal(n3);
        expect(n3.next).to.equal(n4);
        expect(n4.next).to.equal(null);
    });
    it('should not remove anything', () => {
        const n1 = { value: 1, next: null };
        const n2 = { value: 2, next: null };
        const n3 = { value: 3, next: null };
        const n4 = { value: 3, next: null };
        n1.next = n2;
        n2.next = n3;
        n3.next = n4;
        removeDup(n1);
        expect(n1.next).to.equal(n2);
        expect(n2.next).to.equal(n3);
        expect(n3.next).to.equal(null);
    });
});