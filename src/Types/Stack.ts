interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
}

/**
 * Class representing abstract data structure: Stack (LIFO)
 * @example
 * ```ts
 * const stack = new Stack<string>();
 * stack.push("A");
 * stack.push("B");
 * stack.size(); // Output: 2
 * stack.peek(); // Output: "B"
 * stack.size(); // Output: 2
 * stack.pop();  // Output: "B"
 * stack.size(); // Output: 1
 * @typeParam T - Type of objects the Stack contains
 */
export class Stack<T> implements IStack<T> {
    private storage: T[] = [];

    constructor(private capacity: number = Infinity) {}

    push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Stack has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }

    pop(): T | undefined {
        return this.storage.pop();
    }

    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }

    size(): number {
        return this.storage.length;
    }
}
