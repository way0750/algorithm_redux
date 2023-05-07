/**
 * URLify: Write a method to replace all spaces in a string with '%20:
 * You may assume that the string has sufficient space at the end to hold the additional characters,
 * and that you are given the "true" length of the string. (Note: If implementing in Java,
 * please use a character array so that you can perform this operation in place.)
 * 
 * split string into an array of single chars
 * map through the array and replace space with %20
 * join mapped array
 * 
 * time: O(n), space: O(n*3) === O(n);
 */

export function spaceReplace(str) {
    const strArr = str.split('');
    return strArr.map((char) => {
        return char === ' ' ? '%20' : char;
    }).join('');
}
