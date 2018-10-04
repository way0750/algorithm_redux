// Given a list of integers and a number K, return which contiguous elements of the list sum to K.
// For example, if the list is [1, 2, 3, 4, 5] and K is 9, then it should return [2, 3, 4].

/**
 * if the number list going to be sorted?
 * are there duplicated numbers?
 * 
 * if they are sorted, and yes there are duplicated nubmers:
 * if the first number is already bigger than K, return empty array []
 * else
 * maintain two pointers ;
 * pointers front: P_Front start at 0, and pointers back P_Back starts at 0
 * declar a varible: curSum, and assign 0 to it 
 * as P_Front move from index 0 forward, add the number at P_Front to curSum 
 *   then ask if the curSum is equal to K, if yes return subArray from P_Back..P_Front+1
 *   else if curSum larger than curSum, then curSum -= number at P_Back, then P_Back++
 * 
 * return default [];
 */