/**
 * Write a method to compute all permutations of a string of unique characters.
 * set currentPermutations to []
 * go through each character, for each character, if currentPermutations is empty
 * just add it self
 * but if currentPermutations is not empty, add to each position to each string
 * in that array. you will end up with more permutations, let those replace currentPermutations
 * ex ['a']
 * curChar is 'b'
 * you get 'ba' and 'ab'
 */