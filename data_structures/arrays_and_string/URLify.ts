/**
 * URLify: Write a method to replace all spaces in a string with '%20:
 * You may assume that the string has sufficient space at the end to hold the additional characters,
 * and that you are given the "true" length of the string. (Note: If implementing in Java,
 * please use a character array so that you can perform this operation in place.)
 * EXAMPLE
 * Input: "Mr John Smith " 13 Output: "Mr%20J ohn%20Smith"
 * 
 * solution 1:
 * loop the string backward by the true length-1 to move the chars to the far right side of the string
 * maintain two indexes current char index (from the loop)
 * and the current insert-index
 * for each loop:
 *   if cur char is a space, then update the index from insert-index-3 to insert-index
 *     then switch insert-index to - 4
 *   else
 *     just update the insert-index to curChar and switch insertIndex to -1;
 *  return the new string
 * 
 *  time and space:
 *  time: if the string is mutatable structure then we will just update the entire
 *  string which is the same length as the input, but not the same as the true length
 * 
 *  space: same as the input string
 *  
 *  so n for both
 */