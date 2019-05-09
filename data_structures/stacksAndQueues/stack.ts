/**
 * implement a stack class without using array
 * it has to have these instance methods:
 * pop(), push(), peek(), isEmpty()
 * 
 * solution 1:
 * use an plaint object, then use numbers as key, each time you add anything or
 * remove anything, you use the property lastNumKey
 * each time you add or remove you also update the current count
 */

export class Stack {
  // use this as a way to find index to add new value.
  // and to tell the amount of items are in the stack store.
  public addAbleIndex: number = 0;
  private store: {[key: string]: any} = {};

  public length() {
    return this.addAbleIndex;
  }

  public push(newVal) {
    this.store[this.addAbleIndex++] = newVal;
  }

  public pop() {
    // move one index back to get value to pop and to push new value later on
    --this.addAbleIndex;
    const val = this.store[this.addAbleIndex];
    // remove that value from the store:
    delete this.store[this.addAbleIndex];
    return val;
  }

  public isEmpty() {
    return !this.addAbleIndex;
  }

  public peek() {
    return this.store[0];
  }
}

describe('Stack Class', () => {
  it('should return length', () => {
    const stack = new Stack();
    expect(stack.length()).to.equal(0);
  });
  it('should add', () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect((stack as any).store).to.eql({0: 1, 1: 2, 2: 3});
  });
  it('should remove', () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);

    const pv = 4;
    stack.push(pv);
    const popVal = stack.pop();
    expect(popVal).to.equal(pv);
    expect((stack as any).store).to.eql({0: 1, 1: 2, 2: 3});
    expect(stack.addAbleIndex).to.eql(3);
  });
  it('should tell if it is empty', () => {
    const stack = new Stack();
    expect(stack.isEmpty()).to.be.true;
    stack.push(1);
    expect(stack.isEmpty()).to.be.false;
  });
  it('should return the first element', () => {
    const stack = new Stack();
    expect(stack.peek()).to.equal(undefined);
    stack.push(1);
    expect(stack.peek()).to.equal(1);
  });
});