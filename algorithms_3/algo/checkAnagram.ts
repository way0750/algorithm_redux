export function isAnagram(str1, str2) {
    if (str1.length !== str2.length) return false;
    const freqCache = {};
    for (let i = 0; i < str1.length; i++) {
        const str1Char = str1[i];
        freqCache[str1Char] = freqCache[str1Char] || 0;
        freqCache[str1Char]++;
    }
    for (let i = 0; i < str2.length; i++) {
        const str2Char = str2[i];
        freqCache[str2Char] = freqCache[str2Char] || 0;
        freqCache[str2Char]--
        if (freqCache[str2Char] < 0) return false
    }

    return true;
}

describe('should work', () => {
    it('should work', () => {
        expect(isAnagram('anagram', 'nagaram')).to.equal(true);
    });
});
