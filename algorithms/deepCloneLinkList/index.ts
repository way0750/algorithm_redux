const _ = require('lodash');
/**
 * Given the head to a singly linked list, where each node also has a “random” pointer that points to anywhere in the linked list, deep clone the list.
 */

/**
 * each node has a next and random pointer
 * if there is only a next pointer, that would a lot easier to deep clone the list, you don't have the next node yeah, but you can create
 * it and easily reference it
 * the tough part is having the random pointer pointing to specific node
 * 
 * one solution:
 * mutate the list node, add a new property call selfClone which is a deepClone of self
 * do the same thing node by node
 * then loop through the link list to add next and random pointers, once add, remove that property from original node
 * return the head node of the cloned list
 */

function loopLinklist (curNode, callBack) {
  while(curNode) {
    callBack(curNode);
    curNode = curNode.next;
  }
}

export function deepCloneLinklist(headNode) {
  loopLinklist(headNode, (curNode) => {
    curNode.selfClone = _.cloneDeep(curNode);
  });
  loopLinklist(headNode, (curNode) => {
    if (curNode.next) {
      curNode.selfClone.next = curNode.next.selfClone;
    }
    if (curNode.random) {
      curNode.selfClone.random = curNode.random.selfClone;
    }
  });

  const cloneHeadNode = headNode && headNode.selfClone;

  loopLinklist(headNode, (curNode) => {
    delete curNode.selfClone;
  });

  return cloneHeadNode;
}

describe('deep clone complext link list', () => {
  it('should pass all node while loop list', () => {
    const node1 = { value: 1, next: null, random: null };
    const node2 = { value: 2, next: null, random: null };
    const node3 = { value: 3, next: null, random: null };
    const node4 = { value: 4, next: null, random: null };
    const node5 = { value: 1, next: null, random: null };
    const node6 = { value: 2, next: null, random: null };
    const node7 = { value: 3, next: null, random: null };
    node1.next = node2;
    node2.next = node3;
    node2.random = node1;

    node3.next = node4;
    node4.next = node5;
    node5.next = node6;
    node5.random = node4;

    node6.next = node7;
    const values = []
    loopLinklist(node1, (node) => {
      values.push(node.value);
    });
    expect(values).to.deep.equal([1,2,3,4,1,2,3]);
  });
  it('should return 1,2,3,4,1,2,3', () => {
    const node1 = { value: 1, next: null, random: null };
    const node2 = { value: 2, next: null, random: null };
    const node3 = { value: 3, next: null, random: null };
    const node4 = { value: 4, next: null, random: null };
    const node5 = { value: 1, next: null, random: null };
    const node6 = { value: 2, next: null, random: null };
    const node7 = { value: 3, next: null, random: null };
    node1.next = node2;
    node2.next = node3;
    node2.random = node1;

    node3.next = node4;
    node4.next = node5;
    node5.next = node6;
    node5.random = node4;

    node6.next = node7;

    const cloneList = deepCloneLinklist(node1);
    const orderValues = [];
    loopLinklist(cloneList, (curNode) => {
      orderValues.push(curNode.value);
    });
    const randomValues = [];
    loopLinklist(cloneList, (node) => {
      const randomValue = node.random ? node.random.value : Infinity;
      randomValues.push(randomValue);
    });
    expect(orderValues).to.deep.equal([1,2,3,4,1,2,3]);
    expect(randomValues).to.deep.equal([Infinity, 1, Infinity, Infinity, 4, Infinity, Infinity]);
    // make sure that the selfClone is gone;

    const selfClones = [];
    loopLinklist(node1, (node) => {
      selfClones.push(node.selfClone);
    });
    expect(selfClones).to.deep.equal([undefined, undefined, undefined, undefined, undefined, undefined, undefined]);
  });
});