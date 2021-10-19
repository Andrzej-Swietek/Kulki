 /**
  * Class representing abstract data structure: Queue (FIFO)
  * @example
  * const Q = new Queue<GraphNode>();
  * Q.push( startPoint );
  * @typeParam T - Type of objects the Queue contains
  */
 export class Queue<T> {
    _store: T[] = [];
    push(val: T) {
        this._store.push(val);
    }
    pop(): T | undefined {
        return this._store.shift();
    }
    empty(): boolean {
        return this._store.length === 0
    }
}
