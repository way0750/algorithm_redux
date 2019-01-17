/**
 * Given a string of parentheses, find the balanced string that can be produced from it
 * using the minimum number of insertions and deletions. If there are multiple solutions, return any of them.
 * For example, given "(()", you could return "(())". Given "))()(", you could return "()()()()".
 * 
 * set leftParentCount to keep track of left parentheses.
 * set finalString to empty string;
 * loop through the input string, and check each character:
 *   if char is '(' then add it to the finalString
 *   if char is ')'
 *     and if leftParentCount is > 0, then reduce it by 1 and enter ')' to finalString
 *     and if leftParentCount is === 0, then enter '()' to finalString
 *  
 *   at the end check leftParentCount, and add same amount of ')' to finalString
 *  
 *   return finalString;
 */