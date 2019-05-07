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
 *   if B is null, then it is an even length list
 * then check A.value === B.value, if isPalindrome is true
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

