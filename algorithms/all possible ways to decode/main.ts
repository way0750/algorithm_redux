/**
 * Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.
 * For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.
 * You can assume that the messages are decodable. For example, '001' is not allowed. 
 * 
 * 
 * solution 1
 * go from left to right, take one char and ask what are all the possible ways from the sub string
 * then take two char and same question
 * 
 * once you get all the possible ways, add the char you take to each way
 * ex: 
 * 2111
 * take 2, then ask 111 what are all the possible ways?
 *   they are 1,1,1; 1,11; 11,1
 *   add 2 to each of them: 2,1,1,1, 2,1,11, 2,11,1
 * take 21, then ask 11 what are all the possible ways?
 *   same thing here
 */
