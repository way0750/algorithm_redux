/**
 * Given a string containing only digits, restore it by returning all possible valid IP address combinations.
    Example:
    Input: "25525511135"
    Output: ["255.255.11.135", "255.255.111.35"]

    some observation:
    if the input is 11111111
    you can go through all possible permutation like this:
    1.11.11111
    11.1.11111
    see the the last 11111?
    it is reusable for 1.11 and 11.1
    that means we can potentially save calculation by caching results
    
 */