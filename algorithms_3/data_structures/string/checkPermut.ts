/**
 * Check Permutation: Given two strings, write a method to decide
 * if one is a permutation of the other.
 * 
 * permutation: same chars but different order
 * so check the existance of each char and its frequency
 * 
 * let freq be the cache keeping track of chars and their respective frequency
 * loop through first string and add char and frequency to freq
 * 
 * then loop through the second str char by char to check if it exists
 * and if yes, reduce the count by 1, if no short cut return false
 * 
 * if any time the 2 strings are not of the same length
 * short cut return false because either there are more characters in one of the strings
 * or there are unique chars
 * so no need to keep on going checking anything
 */

export function checkPermu(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }
    const freq = {};
    for (let i = 0; i < str1.length; i++) {
        const char = str1[i];
        freq[char] = freq[char] || 0;
        freq[char]++;
    }
    for (let j = 0; j < str2.length; j++) {
        const char = str2[j];
        if (!freq[char] || freq[char] < 1) {
            return false;
        } else {
            freq[char]--;
        }
    }

    return true;
}