/**
 * Is Unique: Implement an algorithm to determine if a string has all unique characters.
 * What if you cannot use additional data structures?
 * 
 * a quick and easy way would be keep track of all the character you have run into
 * then check each new character against this set, if not found, then it's unique
 * else it is duplicated
 * 
 * but if we can't use additional data structure. Well expand the string?
 * declear a new string with more space?
 * this can easily work if by characters, it's only alphabet letters because we just need to add
 * 26 indexes to store all the letters. Also, if only alphabet letters then if the string is
 * longer 26, then false for having duplicated letters.
 * 
 */

export function checkUnique(str) {
    const cache = {};
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (cache[char]) {
            return false;
        } else {
            cache[char] = true;
        }
    }
    return true;
}

describe('test', () => {
    it('should return true', () => {
        const str = 'abcdefgh';
        expect(checkUnique(str)).to.be.equal(true);
    });
    it('should return false', () => {
        const str = 'aabcdefgh';
        expect(checkUnique(str)).to.be.equal(false);
    });
});