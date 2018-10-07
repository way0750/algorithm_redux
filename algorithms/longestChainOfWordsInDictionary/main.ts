/**
 * given a list of words, find the longest chain of words in the following way:
 * input: [spring, in, sin, spin, cat, day, dog, food, sping, shoes]
 * return: [in, sin, spin, sping, spring]
 * 
 * each word in the chain increases by one extra character than the previous word
 * and the order the of letters from previous have be maintained
 * ex: [ab, bka] this is't a chain, because kba, even though it has both ab from prevous
 * word, the order isn't maintained
 * [ab, akb], this is a chain, akb has both 'a' and 'b', and the order is maintained in akb
 */