/**
 * Reverse Words in a Sentence
 * just keep on taking in chars as long as the current char isn't a space
 * (multiple spaces?) or end of sentence
 * 
 */

export function reverseWords(str) {
    let words = [];
    let curWord = '';
    for (let i = 0; i <= str.length; i++) {
        const char = str[i];
        // end of word or end of str
        if (char === ' ' || i === str.length) {
            if (curWord.length) words.unshift(curWord);
            curWord = ''
        } else {
            curWord += char;
        }
    }

    return words.join(' ');
}

describe('test', () => {
    it('should work', () => {
        const str = 'the sky is blue';
        expect(reverseWords(str)).to.equal('blue is sky the')
    });
});