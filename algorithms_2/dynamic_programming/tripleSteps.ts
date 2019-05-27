/**
 * A child is running up a staircase with n steps and can hop either
 * 1 step, 2 steps, or 3 steps at a time. Implement a method to
 * count how many possible ways the child can run up the stairs.
 * 
 * this could be solved by dynamic programming because:
 * if taking
 * 1,1,1,1,1,1
 * 2,2,2
 * 3,3
 * and many other patterns
 * we will reach the same spot/index:
 * 5, which means we can reuse results from 6 and on
 * so working backward:
 * at each index find all the possible ways to step by looping through all
 * three stepping patterns. As you loop through them, each loop will lead you
 * to a specific index, take total-ways-to-step at the index
 * 
 * solution 1
 * set cache to {}
 * set for loop to loop backward from n to 0
 *   set totalPatterns to 0
 *   each loop you loop 1 to 3 (stepPattern)
 *     n + stepPattern
 *     use that as key to search the cache
 *     if anything is return, add to totalPatterns
 *     if not, then see which stepPattern can go to the end (n)
 *   set cache[current n value] to totalPatterns
 * 
 * return totalPatterns by returning cache[1] or 0;
 */