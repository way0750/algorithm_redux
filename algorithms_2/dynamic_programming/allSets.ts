/**
 * return all subsets of a set.
 * 
 * solution 1
 * just initialize a set of one empty set [[]], cal it main set
 * then loop through input set, add current num to each and every one of the
 * main set (make new set, don't mutate the main set yet)
 * then add those new ones back into the main set
 * 
 * return main set;
 * 
 * time and space
 * time, you will be doubling the amount of sets in the main set
 * you can see that as a binary tree, and you are trying to get node count,
 * so branch**(depth + 1)
 * 2**n+1 or 2**n
 * space: simply 2**n
 */