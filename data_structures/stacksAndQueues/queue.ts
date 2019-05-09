/**
 * Queue class
 * same as stack, use an object but then then because you will be adding in the
 * back and removing from the front, you will need to keep track of which index
 * could be remove now
 */

export class Queue {
  private frontIndex: number = 0;
  private addableIndex: number = 0;
  private store: {[key: string]: any} = {};

  public add(val) {
    this.store[this.addableIndex++] = val;
  }
  
  public length() {
    return this.addableIndex - this.frontIndex;
  }

  public pop() {
    let popVal;
    if (this.length()) {
      popVal = this.store[this.frontIndex];
      delete this.store[this.frontIndex++];
    }

    return popVal;
  }

  public peek() {
    return this.store[this.frontIndex];
  }

  public isEmpty() {
    return !this.length();
  }
}

describe('Queue class', () => {
  it('should return length', () => {
    const q = new Queue();
    expect(q.isEmpty()).to.be.true;
    q.add(1);
    q.add(2);
    q.add(3);
    q.add(4);
    expect(q.length()).to.equal(4);
    expect(q.isEmpty()).to.be.false;
  });
  it('should be able to add and pop', () => {
    const q = new Queue();
    q.add(1);
    q.add(2);
    q.add(3);
    q.add(4);
    expect(q.peek()).to.equal(1);
    const removeVal = q.pop();
    expect(removeVal).to.equal(1);
    expect(q.length()).to.equal(3);
  });
});