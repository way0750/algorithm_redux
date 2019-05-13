/**
 * Tries
 * Methods:
 * add words
 * check if words exist
 * out put all words
 * count the amount of words
 * 
 * solution:
 * just link bunch of nodes together
 * and a hash table for children
 */

/**
 * when receiving a string in the add function
 * that is a string for adding children or grand children ...
 * so when you recursively call the call function you need to call with
 * inputString.slice(1);
 * which means you will receive an empty string eventually
 * set that to be the base case
 * and when receiver an empty string, find '*' as a child node
 * 
 * base case:
 *    if input string is empty, see if there is already a childNode '*'
 *       if no, set it
 *       if yes, return
 *    
 *  what to always return?
 *    nothing
 *  what to do with return?
 *    nothing
 *  how to make problem smaller:
 *    recursively call function with string.slice(1) || '';
 */

export class Tries {
  public value: string;
  private children: { [key: string]: Tries} = {};

  constructor(value?) {
    this.value = value;
  }
  
  public add(str) {
    const childKey = str[0] || '*';
    this.children[childKey] = this.children[childKey] || new Tries(childKey);
    const childNode = this.children[childKey];
    if (str.length > 0) {
      childNode.add(str.slice(1));
    }
  }

  public countWords() {
    if (this.value === '*') {
      return 1;
    }

    const childKeys = Object.keys(this.children);
    return childKeys.reduce((sum, childKey) => {
      return sum + this.children[childKey].countWords() ;
    }, 0);
  }

  /**
   * Just check and see if the first character of the input string
   * if found in the children list
   * base case str is empty and there is '*' as child then return true
   */
  public searchWord(str): Boolean {
    if (!str) {
      return !!this.children['*'];
    }
    const childKey = str[0];
    const childNode = this.children[childKey];
    const subSearchResult = childNode && childNode.searchWord(str.slice(1));
    return !!subSearchResult;
  }
}

describe('Tries', () => {
  it('Should be able to create Tries', () => {
    const t = new Tries();
    t.add('world');
    t.add('word');
    expect(t.countWords()).to.equal(2);

    t.add('apple');
    expect(t.countWords()).to.equal(3);

    t.add('app');
    expect(t.countWords()).to.equal(4);

    t.add('zoo');
    expect(t.countWords()).to.equal(5);

    t.add('zoolander');
    expect(t.countWords()).to.equal(6);
  });

  it('Should be able to search Tries', () => {
    const t = new Tries();
    t.add('world');
    t.add('word');
    expect(t.searchWord('word')).to.be.true;
    expect(t.searchWord('words')).to.be.false;
  });
});