/**
 * Return Kth to Last: Implement an algorithm to find the kth to last element of a singly linked list.
 * 
 * without a pointer to previous node, you can recursively call to the tail then
 * starting from tail counting backward until hitting kth time and return that node
 * what if kth is larger then the length of the list? return null?
 * time and space:
 * time length of linkedlist
 * space length of linkedlist
 * 
 * another solution:
 * convert the entire linkedlist to array and get the kth
 * same time and space
 */
import { LinkedList } from './linkedList';

export function getKthNodeByConvertingToArray(list: LinkedList, k) {
  let kthNode = null;
  const nodes = list.mapToArray((node) => node);
  if (k <= nodes.length && k > 0) {
    kthNode = nodes[nodes.length - k];
  }

  return kthNode;
}

export function getKthNodeByRecursion(list: LinkedList, k) {
  let kthNode = null;
  /**
   * base case: input node is null, return 0
   * what to always return? a number indicating current level
   * what to do with returned value? add 1 to it to get current level
   * how to make problem smaller? keep passing on the next value
   */

  function search(node) {
    if (!node) {
      return 0;
    } else {
      const curLevel = search(node.next) + 1;
      if (curLevel === k) {
        kthNode = node;
      }
      return curLevel;
    }
  }

  search(list.head);

  return kthNode;
}

describe('returnKth to last node', () => {
  describe('getKthNodeByConvertingToArray', () => {
    it('should return 2 for 1,2,3 and k = 2', () => {
      const list = new LinkedList();
      list.appendToTail(1);
      list.appendToTail(2);
      list.appendToTail(3);
      expect(getKthNodeByConvertingToArray(list, 2).value).to.eql(2);
    });
    it('should return null for 1,2,3 and k = 20', () => {
      const list = new LinkedList();
      list.appendToTail(1);
      list.appendToTail(2);
      list.appendToTail(3);
      expect(getKthNodeByConvertingToArray(list, 20)).to.eql(null);
    });
    it('should return null for 1,2,3 and k = 0', () => {
      const list = new LinkedList();
      list.appendToTail(1);
      list.appendToTail(2);
      list.appendToTail(3);
      expect(getKthNodeByConvertingToArray(list, 0)).to.eql(null);
    });
  });
  describe('getKthNodeByRecursion', () => {
    it('should return 2 for 1,2,3 and k = 2', () => {
      const list = new LinkedList();
      list.appendToTail(1);
      list.appendToTail(2);
      list.appendToTail(3);
      expect(getKthNodeByRecursion(list, 2).value).to.eql(2);
    });
    it('should return null for 1,2,3 and k = 20', () => {
      const list = new LinkedList();
      list.appendToTail(1);
      list.appendToTail(2);
      list.appendToTail(3);
      expect(getKthNodeByRecursion(list, 20)).to.eql(null);
    });
    it('should return null for 1,2,3 and k = 0', () => {
      const list = new LinkedList();
      list.appendToTail(1);
      list.appendToTail(2);
      list.appendToTail(3);
      expect(getKthNodeByRecursion(list, 0)).to.eql(null);
    });
  });
});