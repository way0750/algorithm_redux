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
  public constructor(arr: Array<number>, size: number) {
    this.logicalLength = size;
    // only add the element that is not 0;
    for (let index = 0; index < size; index++) {
      const num = arr[index];
      if (num !== 0) {
        this.storage[index] = num;
      }
    }

    return this;
  }

  public init(arr: Array<number>, size: number) {
    return this.constructor(arr, size);
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

describe('Testing SparseArray', () => {
  it('test 1', () => {
    const regularArray = [1,2,30,0,0,0,0,5,6];
    const sparseArray = new SparseArray(regularArray, 10);
    expect((sparseArray as any).storage).to.deep.equal({
      0: 1,
      1: 2,
      2: 30,
      7: 5,
      8: 6,
      9: undefined
    });
  });

  it('test 2', () => {
    const regularArray = [1,2,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6];
    const sparseArray = new SparseArray(regularArray, 10);
    expect((sparseArray as any).storage).to.deep.equal({ 0: 1, 1: 2, 2: 30 });
    expect((sparseArray as any).logicalLength).to.equal(10);
  });

  it('test 3', () => {
    const regularArray = [1,2,30,0,0,0,0,0,0,0,0,0,5,6];
    const sparseArray = new SparseArray(regularArray, 10);
    expect((sparseArray as any).storage).to.deep.equal({ 0: 1, 1: 2, 2: 30 });
    expect((sparseArray as any).logicalLength).to.equal(10);

    sparseArray.set(100, 9999);
    expect((sparseArray as any).logicalLength).to.equal(101);
    expect((sparseArray as any).storage).to.deep.equal({ 0: 1, 1: 2, 2: 30, 100: 9999 });
    
    expect(sparseArray.get(100)).to.equal(9999);
  });
});