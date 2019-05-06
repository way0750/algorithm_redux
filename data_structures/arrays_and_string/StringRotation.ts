/**
 * String Rotation: Assume you have a method isSubstring which checks if
 * one word is a substring of another. Given two strings, 51 and 52, write
 * code to check if 52 is a rotation of 51 using only one call to isSubstring (e.g.,"waterbottle"is a rotation of"erbottlewat").
 * 
 * solution 1
 * well if you can assume the existence of the method isSubstring(), and you can
 * only call it once then...
 * s1+s1 this will make a longer string which will handle all passing rotation
 * of s1
 * then find s2 in it
 */

