class LRU {
  private size = 0;
  private curSize = 0;
  private cache = {};
  private linkedListHead;
  private linkedListEnd;

  constructor(size) {
    this.size = size;
  }
  // will use double linked list
  // because easy to move items in the middle of the ordered collection
  // will use a cache/object for the sake of O(1) of access speed
  public put(key, value) {
    if (this.cache[key]) {
      this.cache[key].value = value;
    } else {
      this.curSize++;
      this.cache[key] = { key, value, parent: null, next: null};
    }
    let curNode = this.cache[key];

    // add/update value first
    this.addNode(curNode);

    if (this.curSize > this.size) {
      this.removeLastNode();
    }
  }

  public get(key) {
    // this will return an object...
    const foundObj = this.cache[key] || {};
    return foundObj.value;
  }

  private addNode(curNode) {
    // here move node around
    // get the node, detach links
    if (!this.linkedListHead) {
      this.linkedListHead = curNode;
    } else if (!this.linkedListEnd) {
      curNode.next = this.linkedListHead;
      this.linkedListHead.parent = curNode;
      this.linkedListEnd = this.linkedListHead;
      this.linkedListHead = curNode;
    } else {
      // move current node to front
      const curNodeParent = curNode.parent;
      const curNodeNext = curNode.next;
      if (curNodeParent) {
        curNodeParent.next = curNodeNext;
      }
      if (curNodeNext) {
        curNodeNext.parent = curNodeParent;
      }
      // set curNode as head node
      curNode.parent = null;
      curNode.next = this.linkedListHead;
      this.linkedListHead.parent = curNode;
      this.linkedListHead = curNode;
    }
  }

  private removeLastNode() {
    // then fix the size
    // just simply remove the end node and update the size
    const nodeToDelete = this.linkedListEnd || { parent: null, next: null, key: '' };
    const parentNode = nodeToDelete.parent;
    if (parentNode) {
      parentNode.next = null;
    }
    this.linkedListEnd = parentNode;
    nodeToDelete.parent = null;
    delete this.cache[nodeToDelete.key];
    this.curSize--;
  }
}

describe('LSU', () => {
  it('should work 1', () => {
    const lru = new LRU(2);
    lru.put('a', 'aa');
    lru.put('a', 'aaa');
    expect(lru.get('a')).to.eql('aaa');
  });
  it('should work 2', () => {
    const lru = new LRU(2);
    lru.put('a', 'aa');
    expect(lru.get('a')).to.eql('aa');
  });
  it('should work 3', () => {
    const lru = new LRU(2);
    lru.put('a', 'aa');
    lru.put('b', 'bb');
    lru.put('c', 'cc');
    lru.put('d', 'dd');
    expect((lru as any).get('a')).to.eql(undefined);
  });
  it('should work 3', () => {
    const lru = new LRU(2);
    lru.put('a', 'aa');
    lru.put('b', 'bb');
    lru.put('c', 'cc');
    lru.put('d', 'dd');
    expect(lru.get('d')).to.eql('dd');
    expect(lru.get('c')).to.eql('cc');
  });
});