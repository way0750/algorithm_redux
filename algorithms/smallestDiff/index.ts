/**
 * Given two unsorted array of integers, positive or negative
 * find two elements, one from each array, such that the difference between them is the smallest possible amount
 * these two arrays of integera
 * ex: 
 * arr1: [3,2,5]
 * arr2: [4,7,2]
 * should return 0 because arr1: 2 vs arr2: 2 is 0
 * 
 * solution 1:
 * map through each array to return arrays in this format:
 * [
 *   { value: 3, sourceArr: 'A' }
 *   { value: 2, sourceArr: 'A' }
 *   { value: 5, sourceArr: 'A' }
 * ]
 * 
 * [
 *   { value: 4, sourceArr: 'B' }
 *   { value: 7, sourceArr: 'B' }
 *   { value: 2, sourceArr: 'B' }
 * ]
 * merge these two new arrays and sort by value
 * [
 *   { value: 2, sourceArr: 'B' }
 *   { value: 2, sourceArr: 'A' }
 *   { value: 3, sourceArr: 'A' }
 *   { value: 4, sourceArr: 'B' }
 *   { value: 5, sourceArr: 'A' }
 *   { value: 7, sourceArr: 'B' }
 * ]
 * then find the difference between adjacent element if they are from two different arrays
 * update current mini value if have to
 * [
 *   { value: 2, sourceArr: 'B' }
 *            0
 *   { value: 2, sourceArr: 'A' }
 *            N/A
 *   { value: 3, sourceArr: 'A' }
 *            1
 *   { value: 4, sourceArr: 'B' }
 *            1
 *   { value: 5, sourceArr: 'A' }
 *            2
 *   { value: 7, sourceArr: 'B' }
 * ]
 */

export function findSmallestDiff(arrA, arrB) {
  arrA = arrA.map((num) => { return { value: num, sourceArr: "A" } });
  arrB = arrB.map((num) => { return { value: num, sourceArr: "B" } });
  const sortedMargeArr = [...arrA, ...arrB].sort((arr1Obj, arr2Obj) => {
    if (arr1Obj.value === arr2Obj.value) {
      return 0;
    } else {
      return arr1Obj.value > arr2Obj.value ? 1 : -1;
    }
  });

  let curMin = sortedMargeArr.length > 1 ? Infinity : undefined;
  for (let leftIndex = 0; leftIndex < sortedMargeArr.length - 1; leftIndex++) {
    const rightIndex = leftIndex + 1;
    const leftNumObj = sortedMargeArr[leftIndex];
    const rightNumObj = sortedMargeArr[rightIndex];
    if (leftNumObj.sourceArr !== rightNumObj.sourceArr) {
      const diff = Math.abs(leftNumObj.value - rightNumObj.value);
      curMin = Math.min(curMin, diff);
    }
  }

  return curMin;
}

describe('find smallest diff', () => {
  it('should return like the example', () => {
    const arr1 = [3, 2, 5];
    const arr2 = [4, 7, 2];
    expect(findSmallestDiff(arr1, arr2)).to.equal(0);
  });

  it('should work with unequal arrays', () => {
    const arr1 = [5, 10, 20, 33, 1];
    const arr2 = [4, 7, 2];
    expect(findSmallestDiff(arr1, arr2)).to.equal(1);
  });

  it('should work emtpy arrays', () => {
    const arr1 = [];
    const arr2 = [];
    expect(findSmallestDiff(arr1, arr2)).to.equal(undefined);
  });
});

function printLeftOnly(tree) {
  let nodesOfSameLevel = [tree];
  const printStack = [];
  while (nodesOfSameLevel.length) {
    const children = []
    nodesOfSameLevel.forEach((node) => {
      if (node.left) {
        children.push(node.left)
      }
      if (node.right) {
        children.push(node.right);
      }
    });
    const leftMostNode = nodesOfSameLevel.shift();
    console.log(leftMostNode.value);
    printStack.push(leftMostNode.value);
    nodesOfSameLevel = children;
  }

  return printStack;
}

describe('print left only', () => {
  it('shold return simple list', () => {
    const tree = {
      value: 1,
      left: { value: 3 },
      right: {
        value: 4,
        left: { value: 5},
        right: { value: 6}
      },
    }
    const printStack = [1, 3, 5];
    expect(printLeftOnly(tree)).to.deep.equal(printStack);
  });
});


function isTreeBinarySearchTree(tree) {
  if (!tree) {
    return true;
  }

  const leftNode = tree.left || { value: -Infinity };
  const rightNode = tree.right || { value: Infinity };
  const isCurOrdered = leftNode.value <= tree.value && tree.value <= rightNode.value;

  return isCurOrdered && isTreeBinarySearchTree(tree.left) && isTreeBinarySearchTree(tree.right);
}

describe(' is tree a binary search tree', () => {
  it('should return true for binary search tree', () => {
    const tree = {
      value: 10,
      left: {
        value: 5,
        left: {
          value: 2,
          left: { value: 1}
        },
        right: {
          value: 6
        }
      },
      right: {
        value: 18,
        left: {
          value: 17,
        },
        right: {
          value: 19
        }
      }
    }
    expect(isTreeBinarySearchTree(tree)).to.be.true;
  });
});