// Implement a function to evaluate an expression string. The expression string may contain the plus + or minus sign -, non-negative integers.
// Assume that the given expression is always valid.

// Examples =>
// "2+3" = 5
// "3-5" = -2
// "2-7+3" = -2
// "200-100" = 100

// Follow up

// The expression string may contain open ( and closing parentheses ), the plus + or minus sign -, non-negative integers.
// Assume that the given expression is always valid.

// Examples =>

// "(2+3)-(5+12)" = -12
// "1+6+7+(3-4)" = 13
// "(2+(4-3)+(6+8))" = 17

/*

get some idea from algo about checking if all parents are perfectly matched
by using a stack: push ( in, and pop it bck out and compare to current )

everytime when I run into a ), can I say that I have ran into a meaningful block
expression, 

(2+3)-(5+12)
(2+(4-3)+(6+8))

2+1+14

any time run into a (, start a string and push into stack
(4-3) doMath here without () so we get 4-3 = 1
every time we doMath, we append the result to the last element in the stack

*/



// 1+3+4+(2+(4-3)+1+2+(6+8))+5-6+7

// 1+3+4+x+5-6+7

// 



// 1+3+4+x+5-6+7
function doMathWithParent(str) {
  const stack = [];
  let curExp = '';
  for (let i = 0 ; i < str.length; i++) {
    const curChar = str[i];
    if (curChar === '(') {
      if (curExp) {
        stack.push(curExp);
      }
      curExp = '';
    } else if (curChar === ')') {
      const curExpSum = doMath(curExp);
      if (stack.length) {
        let lastExp = stack.pop();
        lastExp += `${curExpSum}`;
        // stack.push(lastExp);
        curExp = lastExp
      }
    } else {
      curExp += curChar;
    }
  }
  
  return doMath(stack.pop() || '');
}

/*

what doea it mean to do 3-5
3 + -5
2 + 3
we can standardize everything into a + opeartion

input will be a string, so we need to get the numbers out somehow
we can use str.pro.match to do that

1: get numbers
2: we should have an array of num string,
  reduce it into a number
  
"2-7+3"
numStr: ['2;, '-7', '+3']
numbers [2, -7, 3]
*/

function doMath(str) {
  // get numbers:
  const numStr = str.match(/-?\d+/g);
  const numbers = numStr.map((nStr) => Number(nStr));
  
  // sum it up
  return numbers.reduce((sum, num) => sum + num);
}

let s1 = "2+3" // 5
console.log(doMath(s1));

let s2 = "3-5" // = -2
console.log(doMath(s2));

let s3 = "2-7+3" // = -2
console.log(doMath(s3));

let s4 =  "200-100+10-10+100-100+200-200+1" // = 100
console.log(doMath(s4));

// Note: Do not use the built-in library functions like eval(python) etc.


const _ = require('lodash');

function sayHello() {
  console.log('Hello, World');
}

//_.times(5, sayHello);

