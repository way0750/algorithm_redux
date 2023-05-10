/**
 * Stack Min: How would you design a stack which, in addition to push and pop,
 * has a function min which returns the minimum element? Push, pop and min should all
 * operate in 0(1) time.
 * 
 * have two "stacks", one for data, another for current mins.
 * you add to the current mins stack as the values are coming in.
 *  but you only add to it if the values is <= of the current min at top of
 *  current min
 */


export class MinStack {
    values: number[];
    mins: number[];
    constructor() {
        this.values = [];
        this.mins = [];
    }
    push(value) {
        this.values.push(value);
        if (value <= this.mins[this.mins.length - 1]) {
            this.mins.push(value);
        }
    }
    pop() {
        const valToRemove = this.values.pop();
        if (valToRemove === this.mins[this.mins.length - 1]) {
            this.mins.pop();
        }
        return valToRemove;
    }
    min() {
        if (this.mins.length) {
            return this.mins[this.mins.length - 1];
        }
    }
}
