/**
 * Sum Lists: You have two numbers represented by a linked list, where each node contains
 * a single digit. The digits are stored in reverse order, such that the 1's digit is at the head of
 * the list. Write a function that adds the two numbers and returns the sum as a linked list.
 * EXAMPLE
 * Input: (7-) 1 -) 6) + (5 -) 9 -) 2).Thatis,617 + 295. Output: 2 -) 1 -) 9.That is, 912.
 * FOLLOW UP
 * Suppose the digits are stored in forward order. Repeat the above problem. EXAMPLE
 * Input: (6 -) 1 -) 7) + (2 -) 9 -) 5).Thatis,617 + 295. Output: 9 -) 1 -) 2.That is, 912.
 * 
 * keep on while looping through both lists (lengths might be different)
 * set carryOver = 0;
 * and do basic math at the each loop
 *  if sum > 9 then so sum % 10
 * create new list as you go
 */

export function sumList (list1, list2) {
    let curNode1 = list1;
    let curNode2 = list2;
    const newNodes = [];
    let carryOver = 0;
    while (curNode1 || curNode2) {
        curNode1 = curNode1 || { value: 0 };
        curNode2 = curNode2 || { value: 0 };
        let val = carryOver
            + curNode1.value
            + curNode2.value;
        carryOver = Math.floor(val / 10);
        const newNode = { value: val % 10, next: null }
        newNodes.push(newNode);
        curNode1 = curNode1.next;
        curNode2 = curNode2.next;
    }
    if (carryOver) {
        newNodes.push({ value: carryOver, next: null });
    }
    for (let i = 0; i < newNodes.length - 1; i++) {
        newNodes[i].next = newNodes[i+1];
    }

    return newNodes[0];
}

describe('sum list', () => {
    it('should sum list of the same length', () => {
        const n1 = { value: 1, next: null };
        const n2 = { value: 2, next: null };
        const n3 = { value: 3, next: null };
        n1.next = n2;
        n2.next = n3;

        const n4 = { value: 1, next: null };
        const n5 = { value: 2, next: null };
        const n6 = { value: 3, next: null };
        n4.next = n5;
        n5.next = n6;
        const newList = sumList(n1, n4);
        expect(newList.value).to.equal(2);
        expect(newList.next.value).to.equal(4);
        expect(newList.next.next.value).to.equal(6);
    });
    it('should sum list of the different length', () => {
        const n1 = { value: 1, next: null };
        const n2 = { value: 2, next: null };
        const n3 = { value: 3, next: null };
        n1.next = n2;
        n2.next = n3;

        const n4 = { value: 1, next: null };
        const n5 = { value: 2, next: null };
        const n6 = { value: 3, next: null };
        const n7 = { value: 9, next: null };
        n4.next = n5;
        n5.next = n6;
        n6.next = n7;
        const newList = sumList(n1, n4);
        expect(newList.value).to.equal(2);
        expect(newList.next.value).to.equal(4);
        expect(newList.next.next.value).to.equal(6);
        expect(newList.next.next.next.value).to.equal(9);
    });
});
