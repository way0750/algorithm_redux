/**
 * Given a positive integer n, find the smallest number of squared integers 
 * which sum to n. For example, given n = 13, return 2 since 13 = 32 + 22 = 9 + 4.
 * Given n = 27, return 3 since 27 = 32 + 32 + 32 = 9 + 9 + 9
 * 
 * 
 * solution 1 using dynamic programming:
 * first without dynamic programming:
 * if n = 13, then you could just search all the possible combo and return the smallest one
 * you can search those combo one by one systematically like this:
 * starting from 1 to 13, you square the current num, let say 1, then you get 1
 * 13 - 1 =  12, then you recursively perform the same operation to find the min amount of squared 
 * integers  for 12. Eventually you will end with with 1 1 1 1 1 a total of 13 of 1s
 * then you redo with 2, 3, 4, so on so forth until hitting square root of n
 * 
 * using dynamic programming
 * do the same as above but starting from 1 to 13, this way you can reuse cached results because:
 * if n = 37
 * you can end up with  2 * 2 + 3 * 3 = 4 + 9 = 13, which means you still need to search 37 - 13 = 24
 * but then when you get to 3, 3 * 3 + 2 * 2, same thing, you can have to search the min amount for 24
 * so if you have already calculate the min result for 24, you can just reuse it
 * 
 */