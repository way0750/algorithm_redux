// The power set of a set is the set of all its subsets. Write a function that, given a set, generates its power set.
// For example, given the set {1, 2, 3}, it should return {{}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}.

/**
 * been there done that, all you got to do is make a copy of all current sub sets, add one element into each of the sub set copy
 * repeat until you have gone through all the elements
 * by default start with an empty set
 */