/**
 * Palindrome: Implement a function to check if a linked list is a palindrome.
 * get all the values, reverse them and then compare.
 * time: O(n), space: O(n);
 */

export function isPalindrome(list) {
    const vals = [];
    let curNode = list;
    while(curNode) {
        vals.push(curNode.value);
        curNode = curNode.next;
    }
    return vals.join('') === vals.reverse().join('');
}

describe('Is Palindrome', () => {
    it('yes', () => {
        const n1 = { value: 'a', next: null };
        const n2 = { value: 'b', next: null };
        const n3 = { value: 'b', next: null };
        const n4 = { value: 'a', next: null };
        n1.next = n2;
        n2.next = n3;
        n3.next = n4;
        expect(isPalindrome(n1)).to.equal(true);
    });
    it('yes', () => {
        const n1 = { value: 'a', next: null };
        const n2 = { value: 'b', next: null };
        const n3 = { value: 'w', next: null };
        const n4 = { value: 'a', next: null };
        n1.next = n2;
        n2.next = n3;
        n3.next = n4;
        expect(isPalindrome(n1)).to.equal(false);
    });
});