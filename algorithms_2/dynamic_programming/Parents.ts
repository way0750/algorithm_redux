/**
 * Parens: Implement an algorithm to print all valid (e.g., properly opened
 * and closed) combinations of n pairs of parentheses.
 * EXAMPLE
 * Input: 3
 * Output: ((())), (())(), (()()), ()(()), ()()()
 * 
 * solution 1:
 * you can go from 1 ... to n because you can reuse previous results
 * ex 1: ()
 * then for 2, you can add a new one to by adding the ( to where it wouldn't
 * break any parent, and then add ) to the end
 * so (),
 * (())     (()   ()()
 * ^ yes     ^ no   ^ yes
 */

export function getParens(count) {
  let finalParens = [];
  while (count > 0) {
    count--;
    finalParens = finalParens.reduce((curParens, pattern) => {
      let openParenCount = 0;
      for (let i = 0; i <= pattern.length; i++) {
        if (!openParenCount) {
          const leftStr = pattern.slice(0, i);
          const rightStr = pattern.slice(i);
          curParens.push(`${leftStr}(${rightStr})`);
        }
        if (pattern[i] === '(') {
          openParenCount++
        } else if (pattern[i] === ')') {
          openParenCount--;
        }
      }
      return curParens;
    }, []);
  }
  return finalParens;
}