/**
 * Binary Heaps min and max heap
 * required methods:
 * Because we will use an array to implement a the heap because it will a
 * complete tree
 * so we will need:
 * find parent index given child index
 * find child index given parent index
 * 
 * add value and sort
 * remove/extra min/max and resort
 */

export class BinaryHeap {
  private isMinHeap: Boolean = true;
  private store: Array<any> = [];
  private compareFunc: Function;
  constructor({ isMinHeap = true, compareFunc }: { isMinHeap: Boolean, compareFunc?: Function }) {
    this.isMinHeap = isMinHeap;
    if (!compareFunc) {
      this.compareFunc = this.isMinHeap
      ? function isSmaller (child, parent) { return child <= parent } 
      : function isBigger (child, parent) { return parent <= child } 
    } else {
      this.compareFunc = compareFunc;
    }
  }

  public add(value) {
    // add to the back and bubble its way to the top
    let childIndex = this.store.length;
    this.store.push(value);
    while (childIndex) {
      const parentIndex = this.getParentIndexes(childIndex);
      const parent = this.store[parentIndex];
      const child = this.store[childIndex];
      const shouldSwap = this.compareFunc(child, parent);
      if (shouldSwap) {
        this.store[parentIndex] = child;
        this.store[childIndex] = parent;
      }
      childIndex = parentIndex;
    }
  }

  public extract() {
    // take the top most and save it
    // then set the last child as the top most
    // then go from top to bottom and sort
    const returnVal = this.store.shift();
    let parent = this.store.pop();
    this.store.unshift(parent);
    let parentIndex = 0;
    // keep going as long as there are child indexes to compare and potentially
    // swap
    let { left, right } = this.getChildIndexes(parentIndex);
    const storeLength = this.store.length;
    while(left < storeLength || right < storeLength) {
      let parentVal = this.store[parentIndex];
      let leftChild = this.store[left];
      let rightChild = this.store[right];
      let newParentIndex;
      if (this.compareFunc(leftChild, parentVal)) {
        this.store[parentIndex] = leftChild;
        this.store[left] = parentVal;
        newParentIndex = left;
        parentVal = this.store[parentIndex];
      }

      if (right < storeLength && this.compareFunc(rightChild, parentVal)) {
        this.store[parentIndex] = rightChild;
        this.store[right] = parentVal;
        newParentIndex = right;
      } else {
        newParentIndex = left;
      }
      parentIndex = newParentIndex;
      const newChildrenIndexes = this.getChildIndexes(parentIndex);
      left = newChildrenIndexes.left;
      right = newChildrenIndexes.right;
    }
    return returnVal;
  }

  private getParentIndexes(childIndex) {
    return Math.floor((childIndex - 1)/2);
  }

  private getChildIndexes(parentIndex) {
    const parent2 = parentIndex * 2;
    return {
      left: parent2 + 1,
      right: parent2 + 2
    };
  }
}

describe('Binary Heaps', () => {
  describe('Min heap', () => {
    let heap;
    beforeEach(() => {
      heap = new BinaryHeap({ isMinHeap: true });
      heap.add(4);
      heap.add(9);
      heap.add(3);
      heap.add(99);
      heap.add(4);
      heap.add(2);
      heap.add(1);
    })
    it('Should be able to create min heap', () => {
      expect((heap as any).store.length).to.equal(7);
      const head = (heap as any).store[0];
      const min = heap.extract();
      expect(head).to.equal(min);
    });
    it('Should be able to extra in order', () => {
      let min = heap.extract();
      expect(min).to.eql(1);

      min = heap.extract();
      expect(min).to.eql(2);

      min = heap.extract();
      expect(min).to.eql(3);

      min = heap.extract();
      expect(min).to.eql(4);

      min = heap.extract();
      expect(min).to.eql(4);

      min = heap.extract();
      expect(min).to.eql(9);

      min = heap.extract();
      expect(min).to.eql(99);
    });
  });

  describe('Max heap', () => {
    let heap;
    beforeEach(() => {
      heap = new BinaryHeap({ isMinHeap: false });
      heap.add(4);
      heap.add(9);
      heap.add(3);
      heap.add(99);
      heap.add(4);
      heap.add(2);
      heap.add(1);
    })
    it('Should be able to create min heap', () => {
      expect((heap as any).store.length).to.equal(7);
      const head = (heap as any).store[0];
      const max = heap.extract();
      expect(head).to.equal(max);
    });

    it('Should be able to extra in order', () => {
      let max = heap.extract();
      expect(max).to.eql(99);

      max = heap.extract();
      expect(max).to.eql(9);

      max = heap.extract();
      expect(max).to.eql(4);

      max = heap.extract();
      expect(max).to.eql(4);

      max = heap.extract();
      expect(max).to.eql(3);

      max = heap.extract();
      expect(max).to.eql(2);

      max = heap.extract();
      expect(max).to.eql(1);
    });
  });
  describe('Provide Custom Function', () => {
    let heap;
    beforeEach(() => {
      function smallByStringLength(s1, s2) {
        return s1.length <= s2.length;
      }

      heap = new BinaryHeap({
        isMinHeap: false,
        compareFunc: smallByStringLength
      });

      heap.add('a');
      heap.add('bt');
      heap.add('456');
      heap.add('wowow');
      heap.add('hey!');
      heap.add('done!!!');
      heap.add('9');
    })
    it('Should be able to create min heap', () => {
      expect((heap as any).store.length).to.equal(7);
      const head = (heap as any).store[0];
      const max = heap.extract();
      expect(head).to.equal(max);
    });

    it('Should be able to extra in order', () => {
      let max = heap.extract();
      expect(max).to.eql('9');

      max = heap.extract();
      expect(max).to.eql('a');

      max = heap.extract();
      expect(max).to.eql('bt');

      max = heap.extract();
      expect(max).to.eql('456');

      max = heap.extract();
      expect(max).to.eql('hey!');

      max = heap.extract();
      expect(max).to.eql('wowow');

      max = heap.extract();
      expect(max).to.eql('done!!!');
    });
  });
});