/**
 * String Rotation: Assume you have amethod isSubstring which checks ifone word is asubstring of another.
 * Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call to
 * isSubstring (e.g.,"waterbottle"is a rotation of"erbottlewat").
 */

const isSubstring = (s1: string, s2: string) => {
    return s2.includes(s1);
}

export function stringRotation(str1, str2) {
    const longStr = str2 + str2;
    return isSubstring(str1, longStr);
};