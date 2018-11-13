// You're given a string consisting solely of (, ), and *. * can represent either a (, ), or an empty string. Determine whether the parentheses are balanced.

// For example, (()* and (*) are balanced. )*( is not balanced.

/**
 * solution: like the usual bracket matching function, use a stack to keep track of how many left side you have ran into so far
 * but each time you run into a * or right side bracket, pop one out.
 * but in case of something like: (*) you will run into having a right side bracket left over.
 * so how about keep track of how * have so far matched with left side bracket?
 * Each time if a right bracket is encountered, reduce the * count, if it is zero then pop from stack
 */