/**
 * give an array of integers and k
 * return all the sub array that can be sum up to k
 * 
 * solution 1:
 * set a hash to record running sum and each running sum's value is an array indexes
 * set curSum to 0
 * set allPatterns to [];
 * then loop through the input array
 *   and add to curSum
 *   push current index to hash[curSum]'s array
 *   now now now....
 *   hash[curSum - k] does this return anything?
 *     if yes, then you have found patterns
 *     loop through each patterns(indexes) and slice those index to current index
 *       put that sub array into allPatterns
 * 
 * 
 * return allPatterns;
 * 
 * time and space
 * time:
 * if you can create a sub pattern with every single index...
 *   so for each index, index**2 amount of pattern
 *   total it would be !n**2, jesus....
 * space: same as time
 *   that is a lot of space
 */