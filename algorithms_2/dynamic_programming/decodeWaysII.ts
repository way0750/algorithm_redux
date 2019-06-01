/*
  A message containing letters from A-Z is being encoded to numbers using the following mapping way:

  'A' -> 1
  'B' -> 2
  ...
  'Z' -> 26
  Beyond that, now the encoded string can also contain the character '*', which can be treated as one of the numbers from 1 to 9.

  Given the encoded message containing digits and the character '*', return the total number of ways to decode it.

  Also, since the answer may be very large, you should return the output mod 109 + 7.

  Example 1:
  Input: "*"
  Output: 9
  Explanation: The encoded message can be decoded to the string: "A", "B", "C", "D", "E", "F", "G", "H", "I".
  Example 2:
  Input: "1*"
  Output: 9 + 9 = 18
  Note:
  The length of the input string will fit in range [1, 105].
  The input string will only contain the character '*' and digits '0' - '9'.

  solution 1:
  ex *23
  from right to left char by char you will get 3 2 *
  for 3 there is only one possible decoding way which is 3
  then for 2: you get a sub string 23: which there two ways
  2,3 or 23 both are valid so you get 2 ways
  then for *: you get this sub string *23
  so if * + all the possible ways of 23 which is 2
  you get 9 * 2 = 18
  if *2,3, then *2 can be 12, 22 both are valid, and for 3 you get 1 possible
  way 22 * 1 which is 22 ways
  so put all together 22 + 2 = 24

  so the basic steps is
  get current character
  and check how many ways you can get

  1: if curChar is 0 then don't do anything go to the next
    ex: 011: 0 in this case isn't valid there is char has numeric value of 0
    but there is 10 and 20, so 0 is only for 10 and 20, so skip to the next
    round
  
  
  2: checking single char, the current char
    ** check next char on right if it is 0, if yes, skip to 3rd step
    just cur char * the rest of the right sub strings
    if curChar is 1..9, then it is 1 way
    so 1 * right sub strings ways
    if curChar is *, then: 9 * cached right sub string ways

  3: checking current char + next char on right
      if curChar+1 is
      A: ** then
          ** that is 11..19(9) + 21..26(6) total 15
          so total 15
      B: *n then check n
          if n === 0 then it is 2
            *0 : if *,0 you can't get anything because 1,0...9,0 because 0 is not valid by itself
                so you don't get anything
                if *0 the best you can do is 10 and 20 so 2
                so total 2
          if n < 7 then you get 2
            ex: *6: 16 and 26 you get 2
          if n > 6 then: 1
            ex: *7: you only get 17 and not 27 (invalid) so 1

      from here on:
      n will never be 0 here because of step 1 for skipping to next loop when curChar is 0
      C: n* check n again:
        if n*, then if n is 1 then you get 11..19 so 9
        if n is 2 then you get 21..26 so 6
        if n is larger than 2 then invalid
        so total can be 9 or 6 or 0
      
      D: nn 
      convert it to number and see if < 27, if yes then 1 else 0
      so it can be just cached result + 1 or 0
*/