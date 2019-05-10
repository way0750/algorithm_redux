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
    const peekCat = this.catStore.peek() || { name: undefined, animalId: Infinity};
    const peekDog = this.dogStore.peek() || { name: undefined, animalId: Infinity};
    let animal = { name: undefined };
    if (this.dogStore.isEmpty() && this.catStore.isEmpty()) {
      animal = undefined;
    } else if (this.dogStore.isEmpty() || peekCat.animalId < peekDog.animalId) {
      this.totalAmount--;
      animal = this.catStore.pop();
    } else {
      this.totalAmount--;
      animal = this.dogStore.pop();
    }

    return animal.name;
  }
  public dequeueCat() {
    if (this.catStore.isEmpty()) {
      return undefined;
    } else {
      this.totalAmount--;
      const animal = this.catStore.pop();
      return animal.name
    }
  }

  public dequeueDog() {
    if (this.dogStore.isEmpty()) {
      return undefined;
    } else {
      this.totalAmount--;
      const animal = this.dogStore.pop();
      return animal.name
    }
  }
}

const CAT = 'cat';
const DOG = 'dog'
describe('Animal Shelter', () => {
  it('Should enqueue', () => {
    const shelter = new AnimalShelter();
    shelter.enqueue(CAT);
    shelter.enqueue(CAT);
    shelter.enqueue(DOG);
    expect(shelter.length()).to.equal(3);
  });
  it('Should dequeue only cat', () => {
    const shelter = new AnimalShelter();
    shelter.enqueue(CAT);
    shelter.enqueue(CAT);
    shelter.enqueue(DOG);
    shelter.enqueue(CAT);
    shelter.enqueue(DOG);
    shelter.enqueue(CAT);
    shelter.enqueue(CAT);
    expect(shelter.dequeueCat()).to.eql(CAT);
    expect(shelter.dequeueCat()).to.eql(CAT);
    expect(shelter.dequeueCat()).to.eql(CAT);
  });
  it('Should dequeue only dog', () => {
    const shelter = new AnimalShelter();
    shelter.enqueue(CAT);
    shelter.enqueue(CAT);
    shelter.enqueue(DOG);
    shelter.enqueue(CAT);
    shelter.enqueue(DOG);
    shelter.enqueue(CAT);
    shelter.enqueue(CAT);
    expect(shelter.dequeueDog()).to.eql(DOG);
    expect(shelter.dequeueDog()).to.eql(DOG);
    expect(shelter.dequeueDog()).to.eql(undefined);
  });
  it('Should dequeue any', () => {
    const shelter = new AnimalShelter();
    shelter.enqueue(CAT);
    shelter.enqueue(CAT);
    shelter.enqueue(DOG);
    shelter.enqueue(CAT);
    shelter.enqueue(DOG);
    shelter.enqueue(CAT);
    shelter.enqueue(CAT);
    expect(shelter.dequeueAny()).to.eql(CAT);
    expect(shelter.dequeueAny()).to.eql(CAT);
    expect(shelter.dequeueAny()).to.eql(DOG);
  });
  it('Should dequeue only cat when no dogs', () => {
    const shelter = new AnimalShelter();
    shelter.enqueue(CAT);
    shelter.enqueue(CAT);
    shelter.enqueue(CAT);
    shelter.enqueue(CAT);
    shelter.enqueue(CAT);
    shelter.enqueue(CAT);
    shelter.enqueue(CAT);
    expect(shelter.dequeueAny()).to.eql(CAT);
    expect(shelter.dequeueAny()).to.eql(CAT);
    expect(shelter.dequeueAny()).to.eql(CAT);
  });
  it('Should dequeue only cat when no cats', () => {
    const shelter = new AnimalShelter();
    shelter.enqueue(DOG);
    shelter.enqueue(DOG);
    shelter.enqueue(DOG);
    shelter.enqueue(DOG);
    shelter.enqueue(DOG);
    shelter.enqueue(DOG);
    shelter.enqueue(DOG);
    expect(shelter.dequeueAny()).to.eql(DOG);
    expect(shelter.dequeueAny()).to.eql(DOG);
    expect(shelter.dequeueAny()).to.eql(DOG);
  });
});