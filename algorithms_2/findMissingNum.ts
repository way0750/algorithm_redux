/**
 * Find the Missing Number in a sorted array
 * range starts at 1
 * there will be no duplicated numbers
 * ex: [1,2,3,4,6,7,8]
 * 
 * some observation:
 * the index and value: the value should be +1 than index
 * so essentially, your job is to find the first element that is not that case
 * use binary search to get that, and remember you need to find the first
 * element meets that criteria: value - index > 1
 * all you have to do is: whenever you find value - index > 1, you also look
 * at the immediate left and see if that the case too, if yes, then you still
 * have to keep going.
 */