/**
 * One Away: There are three types of edits that can be performed on strings: insert a character,
 * remove a character, or replace a character. Given two strings, write a function to check if
 * they are one edit (or zero edits) away.
 * 
 * if lengths are the same, keep on comparing char by char
 *  then count the difference
 * if lengths are diff by 1, loop through the longer str
 *  remove 1 char and build a shorter 1 and then comapre to short str
 * if lengths are diff by > 1, return false
 * 
 * time: O(n^2) space: O(n);
 */

export function oneEditAway(str1, str2) {
    if (Math.abs(str1.length - str2.length) > 1) {
        return false;
    }
    if (Math.abs(str1.length - str2.length) === 1) {
        const longerStr = str1.length > str2.length ? str1 : str2;
        const shortStr = str1.length > str2.length ? str2 : str1;
        for (let i = 0; i < longerStr.length; i++) {
            const newStr = longerStr.slice(0, i) + longerStr.slice(i+1);
            console.log(newStr, shortStr);
            if (newStr === shortStr) {
                return true;
            }
        }
        return false;
    }

    let diffCount = 0;
    for (let i = 0; i < str1.length; i++) {
        const str1Char = str1[i];
        const str2Char = str2[i];
        if (str1Char != str2Char) {
            diffCount++;
        }
    }

    return diffCount < 2;
}

describe('oneEditAway', () => {
    it('should return true', () => {
        const str1 = 'pale';
        const str2 = 'ple';
        expect(oneEditAway(str1, str2)).to.equal(true);
    });
    it('should return true', () => {
        const str1 = 'pales';
        const str2 = 'pale';
        expect(oneEditAway(str1, str2)).to.equal(true);
    });
    it('should return true', () => {
        const str1 = 'pale';
        const str2 = 'bale';
        expect(oneEditAway(str1, str2)).to.equal(true);
    });
    it('should return false', () => {
        const str1 = 'pale';
        const str2 = 'bake';
        expect(oneEditAway(str1, str2)).to.equal(false);
    });
})