/**
 * You have a large array with most of the elements as zero.
 * 
 * Use a more space-efficient data structure, SparseArray, that implements the
 * 
 * same interface: init(arr, size): initialize with the original large array and
 * size. set(i, val): updates index at i with val. get(i): gets the value at
 * index i.
 * 
 * solution:
 * 
 * this is essentially how JavaScript implements Array:
 * using a JSON object without space actually allocated for the array
 * then when actually assigning a value to an index then in the background just
 * add a property: by using the index as the property key, then maintain a
 * length property for traversal purpose
 * and whenever accessing an index that has yet been deliberately assigned, just
 * return a default value: undefined, but in this case we can just number: 0;
 */

export class SparseArray {
  private logicalLength: number = 0;
  private storage: {[key:string]: number} = {};
  public init(arr: Array<number>, size: number) {
    this.logicalLength = size;
    // only add the element that is not 0;
    arr.forEach((num, index) => {
      if (num !== 0) {
        this.storage[index] = num;
      }
    });
  }

  public set(i, val) {
    this.storage[i] = val;
    // need to update the length if setting a value at an index
    // that is out of the current length bound
    if (i >= this.logicalLength) {
      this.logicalLength = i + 1;
    }
  }

  public get(i) {
    if (i >= 0 && i < this.logicalLength) {
      return this.storage.hasOwnProperty(i)
        ? this.storage[i]
        : 0; // return default value: 0 because we never save any 0s.
    } else {
      // going along with the JavaScript implementation:
      return undefined;
    }
  }
}