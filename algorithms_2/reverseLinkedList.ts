/**
 * just reversed a linked list without using recursion
 */
function reverse() {
  let reveredList = this.head;
  let newHead = this.head.next;
  reveredList.next = null;
  while(newHead) {
    const temp = newHead.next;
    newHead.next = reveredList;
    reveredList = newHead;
    newHead = temp;
  }

  this.head = reveredList;
}

function reverseLinkedList(linkedList) {
  let reveredList = linkedList;
  let newHead = linkedList.next;
  reveredList.next = null;
  while(newHead) {
    const temp = newHead.next;
    newHead.next = reveredList;
    reveredList = newHead;
    newHead = temp;
  }

  return reveredList;
}

describe('reverse linkedlist', () => {
  it('1', () => {
    const n1 = { val: 1, next: null };
    const n2 = { val: 2, next: null };
    const n3 = { val: 3, next: null };
    const n4 = { val: 4, next: null };
    const n5 = { val: 5, next: null };
    const n6 = { val: 6, next: null };
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    n4.next = n5;
    n5.next = n6;
    const str = JSON.stringify(reverseLinkedList(n1), null, 2);
    expect(str).to.eql('');
  });

  it('1', () => {
    const n1 = { val: 1, next: null };
    const n2 = { val: 2, next: null };
    const n3 = { val: 3, next: null };
    const n4 = { val: 4, next: null };
    const n5 = { val: 5, next: null };
    const n6 = { val: 6, next: null };
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    n4.next = n5;
    n5.next = n6;
    const str = JSON.stringify(reverseLinkedList(n1), null, 2);
    expect(str).to.eql('');
  });
});