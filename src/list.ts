// ArrayList = Slice in Go (dynamic growing array with length and capacity) = used in JS Arrays
// Great for stack (FILO) but bad for queue (FIFO).
// Enqueue/Deque would be O(N) because of moving every array value one spot.
// Important: Comparison ArrayList vs LinkedList
// ArrayList: get O(1); push/pop O(1); shift/unshift O(N)
// LinkedList: get O(N); push/pop O(1); shift/unshift O(1)
// ArrayBuffer (RingBuffer) has head and tail indices
// tail can wrap arround (tail % len(array) = index)
// if tail = head -> copy to new bigger capacity array (head = 0, tail = len(prevArray))

type Node<T> = {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
};

class Stack<T> {
  public length: number;
  private head?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
  }

  push(item: T): void {
    const node: Node<T> = { value: item };
    this.length++;
    if (!this.head) {
      this.head = node;
      return;
    }

    node.prev = this.head;
    this.head = node;
  }
  pop(): T | undefined {
    if (!this.head) {
      return;
    }

    this.length--;
    const head = this.head;
    this.head = head.prev;
    // free
    head.prev = undefined;

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}

class Queue<T> {
  public length: number;

  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  enqueue(item: T): void {
    const node: Node<T> = { value: item };
    this.length++;
    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }
  deque(): T | undefined {
    if (!this.head) {
      return;
    }

    this.length--;
    const head = this.head;
    this.head = head.next;
    // free
    head.next = undefined;

    if (this.length === 0) {
      this.tail = undefined;
    }

    return head.value;
  }
  peek(): T | undefined {
    return this.head?.value;
  }
}
