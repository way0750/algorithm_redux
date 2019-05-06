/**
 * One Away: There are three types of edits that can be performed on strings:
 * insert a character, remove a character, or replace a character.
 * Given two strings, write a function to check if they are one edit (or zero edits) away.
  EXAMPLE
  pale, pIe -> true pales. pale -> true pale. bale -> true pale. bake -> false

  solution 1:
 * if the difference between two string is more than 1, that means it will be
 * more than 1 edit, return false;
 * if same length, then check character at each index, and maintain a count of
 * how many different character you have found, if more than 1, then return false;
 * if different length (by 1) then you loop through the longer one to compare
 * curent long str char to current short str char, if different then allow the
 * short str index to stay once. if it has already stayed once then return false
 */

export function oneAway(str1, str2) {
  if (Math.abs(str1.length - str2.length) > 1) {
    return false;
  }

  if (str1.length === str2.length) {
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] !== str2[i]) {
        return false;
      }
    }
  } else {
    let longStr;
    let shortStr;
    if (str1.length > str2.length) {
      longStr = str1;
      shortStr = str2;
    } else {
      longStr = str2;
      shortStr = str1;
    }
    let shortStrIndex = 0;
    let shortIndexLegged = false;
    for (let i = 0; i < longStr.length; i++) {
      const longStrChar = longStr[i];
      const shortStrChar = shortStr[shortStrIndex];
      if (shortIndexLegged && (longStrChar !== shortStrChar)) {
        return false;
      } else if (!shortIndexLegged && (longStrChar !== shortStrChar)) {
        shortIndexLegged = true;
      } else {
        shortStrIndex++;
      }
    }
  }

  return true;
}

