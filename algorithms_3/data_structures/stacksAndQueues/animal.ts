/**
 * Animal Shelter: An animal shelter, which holds only dogs and cats, operates on a
 * strictly "first in, first out" basis. People must adopt either the "oldest" (based on arrival
 * time) of all animals at the shelter, or they can select whether they would prefer a
 * dog or a cat (and will receive the oldest animal of that type). They cannot select which
 * specific animal they would like. Create the data structures to maintain this system and
 * implement operations such as enqueue, dequeueAny, dequeueDog, and dequeueCat. You may use the
 * built-in Linked List data structure.
 * 
 * build a special doublely linked list:
 *  between animals two pointer
 *  each node also maintain another pointer pointing to the next node of the same type
 */

export class AnimalQueue {
    // two linked list, one for cat, one for dog
    // in each node just need to maintain a time property, done
}