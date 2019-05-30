/**
 * Implement the "paint nil" function that one might see on many image editing
 * programs. That is, given a screen (represented by a two-dimensional array of
 * colors), a point, and a new color, paint in the surrounding area until the
 * color changes from the original color.
 * 
 * so basically like the minesweeper program?
 * give a position, then do something to surrounding area?
 * 
 * solution 1:
 * save the target color
 * then from the given point, do a breadth search style search:
 * for each point you encounter, if you can paint it, then add the cells around
 * it to the next round
 * 
 * time and space:
 * time, for each point you will check surrounding 8 cells
 * worst case you have to pint all the cells (N), then it's about N * 8 which is
 * N
 * 
 * space, at the very end, worst case you will have outer most layer to paint
 * so it's gonna be width * height
 * if N is the amount of cells, and the shape of the image is a square then 
 * square root of N * 4 - 4
 */