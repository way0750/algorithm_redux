// Given a sorted dictionary of an alien language, find order of characters
// Given a sorted dictionary (array of words) of an alien language, find order of characters in the language.
// Examples:

// Input:  words[] = {"baa", "abcd", "abca", "cab", "cad"}
// Output: Order of characters is 'b', 'd', 'a', 'c'
// Note that words are sorted and in the given language "baa" 
// comes before "abcd", therefore 'b' is before 'a' in output.
// Similarly we can find other orders.

// Input:  words[] = {"caa", "aaa", "aab"}
// Output: Order of characters is 'c', 'a', 'b'

/**
 * the input list has been sorted by the "alien" alphabet
 * sorting is the same as regular alphabet sorting between two strings:
 * ex: in English, if you need to sort "cat" and "bat", the result has to be "bat" then "cat"
 * so basically compare chars at same index of both strings
 * if same chars then no meaning sorting at that index
 * if diff chars, you put the char of lower index first in the sort order
 * so for the provided alien dictionary, words are already sorted
 * if you get this: ["baa", "abcd"], you know "b" is before "a" because meaning sorting is done at index 0
 * where the first different chars are found, and since the list is already sorted, then you know "b" is before "a"
 */