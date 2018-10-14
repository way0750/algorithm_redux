// Given a dictionary of words and a string made up of those words (no spaces), return the original sentence in a list. If there is more than one possible reconstruction, return any of them. If there is no possible reconstruction, then return null.
//
// For example, given the set of words 'quick', 'brown', 'the', 'fox', and the string "thequickbrownfox", you should return ['the', 'quick', 'brown', 'fox'].
//
// Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond', and the string "bedbathandbeyond", return either ['bed', 'bath', 'and', 'beyond] or ['bedbath', 'and', 'beyond'].

/**
 * the quck and intuative way: loop from left to right and get one valid word, then pass the remaining string to the next recursive call.
 * if nothing returns from the recursive call, then keep add new char to the already valid word to see if you can make a longer and valid word
 * if yes then again pass the remaining string to next call.
 * 
 * reusable calculation here. so caching all sub string that can be completely divided in to valid words
 * 
 * recursive case: if remaing string isn't empty, recursively call with it.
 * what to always return:
 *   an array of potentially sub array, each sub array is a pattern
 *   or null for no sub pattern found
 * what to do with return:
 *   if the return is null, then try to search more
 *   if the reutnr is an array, then you have found a valid sub pattern, prepend current valid word
 * how to make problem smaller:
 *   keep taking one char from the input string, and pass the remaining string
 *   if the return from the subsequent recursive call is null, keep taking char from the beginning of the string
 */