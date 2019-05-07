/**
 * singles and doubly linked lists classes
 */

export class Node {
  public value: any;
  public next: any;
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList {
  public head: null | Node;
  public tail: null | Node;
  constructor() {
    this.head = null;
    this.tail = null;
  }

  public appendToTail(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else if (!this.tail) {
      this.head.next = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  public forEach(callBack) {
    let curNode = this.head;
    let pos = 0;
    while(curNode) {
      callBack(curNode, pos++, this);
      curNode = curNode.next;
    }
  }
}

describe('Single Linked List', () => {
  it('should work with one node', () => {
    const newList = new LinkedList();
    newList.appendToTail(11);
    expect(newList.head.value).to.eql(11);
    expect(newList.head.next).to.eql(null);
    expect(newList.tail).to.eql(null);
  });
  it('should work with two node', () => {
    const newList = new LinkedList();
    newList.appendToTail(11);
    newList.appendToTail(22);
    expect(newList.head.value).to.eql(11);
    expect(newList.head.next.value).to.eql(22);
    expect(newList.tail.value).to.eql(22);
  });
  it('should loop through the list', () => {
    const newList = new LinkedList();
    newList.appendToTail(11);
    newList.appendToTail(22);
    const vals = [];
    newList.forEach((node) => {
      vals.push(node.value);
    });
    expect(vals).to.eql([11, 22]);
  });
});