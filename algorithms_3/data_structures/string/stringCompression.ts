/**
 * String Compression: Implement a method to perform basic string compression using the counts
 * of repeated characters. For example, the string aabcccccaaa would become a2b1c5a3. If the
 * "compressed" string would not become smaller than the original string, your method should
 * return the original string. You can assume the string has only uppercase and
 * lowercase letters (a - z).
 * 
 * let freq by an array of [{ char: string, freq: num }]
 * loop through the string char by char
 *  if current char is the same as the last one, freq++
 *  if not, then add { char: current char, freq: 1 }
 * and the end, map and join the freq
 * return the shorter string
 * 
 * time: O(n), space: O(n);
 */

export function stringCompression(str) {
    if (str.length < 2) {
        return str;
    }
    const freq = [{ char: str[0], freq: 0 }];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const lastCharFreq = freq[freq.length - 1];
        if (lastCharFreq.char === char) {
            lastCharFreq.freq++;
        } else {
            freq.push( { char, freq: 1 });
        }
    }

    const compressedStr = freq.map(({ char, freq }) => {
        return `${char}${freq}`;
    }).join('');

    return compressedStr.length < str.length ? compressedStr : str;
}

describe('string compression', () => {
    it('should return correctly', () => {
        const str = 'aabcccccaaa';
        expect(stringCompression(str)).to.equal('a2b1c5a3');
    });
    it('should return the original string', () => {
        const str = 'abcdefg';
        expect(stringCompression(str)).to.equal('abcdefg');
    });
});