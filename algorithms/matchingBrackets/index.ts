/**
 * give a string consisted of brackets, return true if all are matching correctly
 * ex: ({[[]]}){[[]]}{} returns true
 * ex: {{[[]]}}} returns false
 * 
 * solution:
 * maintain a stack of left side brackets, then whenever running into a right side bracket, check and see if both match each other
 * the most recently closing bracket has to match with the most recent opening opening bracket in the stack
 */