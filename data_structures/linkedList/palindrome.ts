/**
 * Palindrome: Implement a function to check if a linked list is a palindrome.
 * 
 * solution 1:
 * use recursion to check the list: use two pointer, A and B
 * A moves one at the time
 * B moves two at the time
 * Once the B is at the end then A is in the middle of the list
 * return and compare previous node and next nodes
 * 
 * set global boolean: isPalindrome to true;
 * base case:
 *   if B.next is null, then it is an even length list
 * then check A.value === A.next.value, if isPalindrome is true
 * and A.value !== A.next.value then set isPalindrome to false
 * else return A.next.next
 *   if B.next is null, then it is an odd length list
 * then return (A.next || {}).next
 * 
 * what to always return: a node on the right side of the middle point that is
 * mirroring the position of the left current node
 * 
 * what to do with the return:
 *    compare the value see if same
 * 
 * how to make problem smaller:
 *   recursively call nodeA and nodeB.next.next // nodeB will have .next because
 *   of the base case setup above ^^^
 */

import { LinkedList, Node } from './linkedList';


export function isPalindromeList(list): boolean {
  let isPalindrome = true;
  function search(nodeA: Node, nodeB: Node ) {
    // even length list
    if(!nodeB.next) {
      if (nodeA.value !== nodeA.next.value) {
        isPalindrome = false;
      }
      return nodeA.next.next;
    } else if (!nodeB.next.next) {
      // odd length list
      if (nodeA.value !== nodeA.next.next.value) {
        isPalindrome = false;
      }
      return nodeA.next.next.next;
    }

    const leftSideNode = search(nodeA.next, nodeB.next.next);
    if (isPalindrome) {
      isPalindrome = nodeA.value === leftSideNode.value;
    }

    return leftSideNode.next;
  }

  const nodeA = list.head;
  const nodeB = list.head ? list.head.next : null;
  // if the list has 0 or 1 node then just return true
  if (!nodeB) {
    return true;
  } else {
    search(nodeA, nodeB);
    return isPalindrome;
  }
}

describe('Palindrome', () => {
  it('should return true for aabbaa', () => {
    const list = new LinkedList();
    list.appendToTail('a');
    list.appendToTail('a');
    list.appendToTail('b');
    list.appendToTail('b');
    list.appendToTail('a');
    list.appendToTail('a');
    expect(isPalindromeList(list)).to.be.true;
  });
  it('should return false for aabcdbaa', () => {
    const list = new LinkedList();
    list.appendToTail('a');
    list.appendToTail('a');
    list.appendToTail('b');
    list.appendToTail('c');
    list.appendToTail('d');
    list.appendToTail('b');
    list.appendToTail('a');
    list.appendToTail('a');
    expect(isPalindromeList(list)).to.be.false;
  });
  it('should return true for aabcbaa', () => {
    const list = new LinkedList();
    list.appendToTail('a');
    list.appendToTail('a');
    list.appendToTail('b');
    list.appendToTail('c');
    list.appendToTail('b');
    list.appendToTail('a');
    list.appendToTail('a');
    expect(isPalindromeList(list)).to.be.true;
  });
  it('should return false for ab', () => {
    const list = new LinkedList();
    list.appendToTail('a');
    list.appendToTail('b');
    expect(isPalindromeList(list)).to.be.false;
  });
});