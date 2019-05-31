/**
 * Coins: Given an infinite number of quarters (25 cents), dimes (10 cents),
 * nickels (5 cents), and pennies (1 cent), write code to calculate the number
 * of ways of representing n cents.
 * 
 * solution 1, expensive recursion:
 * go through each coin type and loop the amount of it from 0...until amount *
 * coin type > input n
 * then for each amount you do: amount * coin type then -n, and remaining.. you
 * pass it to the next call without that coin type
 * 
 * 
 * 
 */