/**
 * String Compression: Implement a method to perform basic string compression
 * using the counts of repeated characters. For example, the string aabcccccaaa
 * would become a2b1c5a3. If the "compressed" string would not become smaller than
 * the original string, your method should return the original string.
 * You can assume the string has only uppercase and lowercase letters (a - z).
 * 
 * solution 1:
 *  initialize curChar to '' and count to 0 and compressedStr to = ''
 *  go through the string char by char
 *  if curChar is '' set it to current character at current index and count to 1
 *  if curChar is different at current character, then add count + curChar to compressedStr
 *    then reset curChar to the new current character, and set count to 1
 *     and compare length of compressedStr to input str, if longer then return inputStr
 *  
 *  at the very end, return the compressedStr;
 */