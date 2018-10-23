// Given two non-empty binary trees s and t, check whether tree t has exactly the same structure and node values with a subtree of s. A subtree of s is a tree consists of a node in s and all of this node's descendants. The tree s could also be considered as a subtree of itself.
/**
 * so given tree s and t, see if s is a sub tree of t
 * solution 1:
 * search through t and keep comparing to s root node by value
 * if same value then pass that node and s to a recursive function to check if from that node on all of s's children values are found
 * 
 * recursive function for comparing two trees:
 * base case
 *   if s node is null: return true
 *   if t node is null: return false
 * what to return always: boolean
 * what to do with return:
 *   if false return false, if true keep searching (first curNode value, then left then right)
 * how to make problem smaller: curNode then call left and right child
 */

export function search(s, t) {
  if (!s) {
    return true;
  } else if (!t) {
    return false;
  }

  return s.value === t.value
    && search(s.left, t.left)
    && search(s.right, t.right);
}

function isSubTreeOf(s, t): boolean {
  if (!s && !t) {
    return true;
  } else if(!s || !t){
    return false;
  }

  if (s.value === t.value) {
    if (search(s, t)) {
      return true;
    }
  }

  return isSubTreeOf(s, t.left) || isSubTreeOf(s, t.right)
}

describe('Sub tree by value', () => {
  it('should work with simple test', () => {
    const tree1 = {
      value: 1,
      left: { value: 2},
      right: { value: 3 }
    };

    const tree2 = {
      value: 1,
      left: { value: 2},
      right: { value: 3 }
    };

    expect(isSubTreeOf(tree1, tree2)).to.be.true;
  });

  it('should be false for not sub tree', () => {
    const tree1 = {
      value: 1,
      left: { value: 2},
      right: { value: 2 }
    };

    const tree2 = {
      value: 1,
      left: { value: 2},
      right: { value: 3 }
    };

    expect(isSubTreeOf(tree1, tree2)).to.be.false;
  });

  it('should be true between big and small tree', () => {
    const tree1 = {
      value: 9,
      left: {
        value: 8,
        left: {
          value: 1,
          left: { value: 2 },
          right: { value: 3 }
        },
        right: { value: 99 }
      },
      right: { value: 32 }
    };

    const tree2 = {
      value: 1,
      left: { value: 2},
      right: { value: 3 }
    };

    expect(isSubTreeOf(tree2, tree1)).to.be.true;
  });
});