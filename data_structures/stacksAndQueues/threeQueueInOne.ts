/**
 * Use one array to implement 3 stacks
 * 
 * set properties to mark the starting and ending index, allocation size of each
 * stack
 * 
 * each time you add and remove element in any stack, you would reorganize the
 * array if the stack you remove/add goes over half or goes under less half of
 * the allocation size. in which case you create a new array and copy all the
 * stacks into it with new starting and ending and allocation size 
 * 
 * these are the instance methods:
 * add length pop peek isEmpty
 */

export class ThreeInOneStack {
  private stackStat = {
    0: {
      startIndex: 0,
      addableIndex: 0,
      allocationSize: 1
    },
    1: {
      startIndex: 1,
      addableIndex: 1,
      allocationSize: 1
    },
    2: {
      startIndex: 2,
      addableIndex: 2,
      allocationSize: 1
    }
  }

  private store: Array<any> = [,,];

  public length(targetStackId = 0) {
    const stackStat = this.stackStat[targetStackId]
    if (stackStat) {
      return stackStat.addableIndex - stackStat.startIndex;
    }
  }

  public isEmpty(targetStackId = 0) {
    return !this.length(targetStackId);
  }
  
  public add(targetStackId, value) {
    if (!this.stackStat[targetStackId]) {
      return false;
    }
    // remember to double or halve the allocation size
    // to get the new startIndex: sum of all previous allocation size
    // to get the new addableIndex new startIndex + (current addableIndex -
    // current startIndex);

    // the process to double or halve:
    // only need to modify all of those indexes of the stacks with ids >=
    // current adding/removing stacks
    // first check and see if you need to double or halve first
    // if no then just add and done
    // if yes then you need go through a loop to first create the array with
    // more indexes then copy, and then add the new value

    // if the final amount of elements is 50% or more than the allocation size
    const targetStack = this.stackStat[targetStackId];
    const needToDouble = (targetStack.addableIndex - targetStack.startIndex + 1) > Math.floor(targetStack.allocationSize / 2);
    if (needToDouble) {
      const newAllocationSizes= {
        0: this.stackStat[0]['allocationSize'],
        1: this.stackStat[1]['allocationSize'],
        2: this.stackStat[2]['allocationSize']
      };
      // double the target stack's size:
      newAllocationSizes[targetStackId] *= 2;

      const newStore = Array(newAllocationSizes[0] + newAllocationSizes[1] + newAllocationSizes[2]);

      let curAllocationSizeSum = 0;
      for (let curStackId = 0; curStackId < 3; curStackId++) {

        if (curStackId >= targetStackId) {
          const { startIndex, addableIndex } = this.stackStat[curStackId];
          const newStartIndex = curAllocationSizeSum;
          const newAddableIndex = newStartIndex + (addableIndex - startIndex);
          const newAllocationSize = newAllocationSizes[curStackId];
          for (let i = startIndex; i < (startIndex + newAllocationSize); i++) {
            if (i < addableIndex) {
              newStore[i] = this.store[i];
            }
          }

          this.stackStat[curStackId] = {
            startIndex: newStartIndex,
            addableIndex: newAddableIndex,
            allocationSize: newAllocationSize
          };
        } else {
          // simple copy and past and nothing more:
          // same start and addable index, same value
          const { startIndex, allocationSize } = this.stackStat[curStackId];
          for(let i = startIndex; i < allocationSize + startIndex; i++) {
            newStore[i] = this.store[i];
          }
        }

        curAllocationSizeSum += newAllocationSizes[curStackId];
      }

      this.store = newStore;
    }

    // here we add the new value:
    const addIndex = this.stackStat[targetStackId].addableIndex;
    this.store[addIndex] = value;
    this.stackStat[targetStackId].addableIndex++;
    return true;
  }
}

describe('Three stacks in one', () => {
  it('should be able to initialize', () => {
    const stack = new ThreeInOneStack();
    expect(stack.length(0)).to.equal(0);
    expect(stack.length(1)).to.equal(0);
    expect(stack.length(2)).to.equal(0);
  });
  it('should isEmpty are true for all 3', () => {
    const stack = new ThreeInOneStack();
    expect(stack.isEmpty(0)).to.be.true;
    expect(stack.isEmpty(1)).to.be.true;
    expect(stack.isEmpty(2)).to.be.true;
  });
  it('should be able to add', () => {
    const stack = new ThreeInOneStack();
    stack.add(0, 1);
    stack.add(0, 11);
    stack.add(0, 11);
    stack.add(0, 11);

    stack.add(1, 2);
    stack.add(1, 22);
    stack.add(1, 22);
    stack.add(1, 22);
    stack.add(1, 222);

    stack.add(2, 3);
    stack.add(2, 3);
    stack.add(2, 3);
    stack.add(2, 3);
    stack.add(2, 3);
    stack.add(2, 3);
    // console.log(JSON.stringify(stack, null, 2));
    expect(stack.length(0)).to.equal(4);
    expect(stack.length(1)).to.equal(5);
    expect(stack.length(2)).to.equal(6);
  });
});