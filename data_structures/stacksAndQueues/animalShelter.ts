import { Queue } from "./queue";

/**
 *  An animal shelter, which holds only dogs and cats, operates on a strictly" first in,
 * first out" basis. People must adopt either the "oldest" (based on arrival time) of
 * all animals at the shelter, or they can select whether they would prefer a dog or
 * a cat (and will receive the oldest animal of that type). They cannot select which
 * specific animal they would like. Create the data structures to maintain this system
 * and implement operations such as enqueue, dequeueAny, dequeueDog, and dequeueCat.
 * You may use the built-in Linked L is t data structure.
 * 
 * solution 1:
 * just use two queues: one for dogs, one for cats.
 * but do time stamp each animal in case we have to dequeue randomly
 * so save the animal as an object with a rank
 */

export class AnimalShelter {
  private catStore: Queue = new Queue();
  private dogStore: Queue = new Queue();
  private animalId: number = 0;
  private totalAmount: number = 0;
  public length() {
    return this.totalAmount;
  }
  public enqueue(animal) {
    const isValidAnimal = ['cat', 'dog'].some((validAnimal) => validAnimal === animal);
    if(!isValidAnimal) {
      return false;
    }
    const animalObj = {
      name: animal,
      animalId: this.animalId++
    };
    if (animal === 'dog') {
      this.dogStore.add(animalObj);
    } else if (animal === 'cat') {
      this.catStore.add(animalObj);
    }

    this.totalAmount++;
    return true;
  }

  public dequeueAny() {
    const peekCat = this.catStore.peek();
    const peekDog = this.dogStore.peek();
    if (this.dogStore.isEmpty() && this.catStore.isEmpty()) {
      return undefined;
    } else if (this.dogStore.isEmpty() || peekCat.animalId < peekDog.animalId) {
      this.totalAmount--;
      return this.catStore.pop();
    } else {
      this.totalAmount--;
      return this.dogStore.pop();
    }
  }
  public dequeueCat() {
    if (this.catStore.isEmpty()) {
      return undefined;
    } else {
      this.totalAmount--;
      return this.catStore.pop();
    }
  }

  public dequeueDog() {
    if (this.dogStore.isEmpty()) {
      return undefined;
    } else {
      this.totalAmount--;
      return this.dogStore.pop();
    }
  }
}