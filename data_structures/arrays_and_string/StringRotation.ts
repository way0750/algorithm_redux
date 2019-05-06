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
function isSubstring(s1, s2) {
  return s1.search(s2) > -1;
}

export function isRotatedSubStr(s1, s2) {
  const longerS1 = s1 + s1;
  return isSubstring(longerS1, s2);
}

describe('String Rotation', () => {
  it('should return true for the example', () => {
    const s1 = 'waterbottle';
    const s2 = 'erbottlewat';
    expect(isRotatedSubStr(s1, s2)).to.be.true;
  });
  it('should return false', () => {
    const s1 = 'waterbottle';
    const s2 = 'erbottlewbt';
    expect(isRotatedSubStr(s1, s2)).to.be.false;
  });
});