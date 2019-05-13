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
      const parentVal = this.store[parentIndex];
      const leftChild = this.store[left];
      const rightChild = this.store[right];
      if (this.compareFunc(leftChild, parentVal)) {
        this.store[parentIndex] = leftChild;
        this.store[left] = parentVal;
        parentIndex = left;
      } else if (right < storeLength && this.compareFunc(rightChild, parentVal)) {
        this.store[parentIndex] = rightChild;
        this.store[right] = parentVal;
        parentIndex = right;
      } else {
        parentIndex = left;
      }
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