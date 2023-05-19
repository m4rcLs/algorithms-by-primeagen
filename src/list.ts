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

export default class DoublyLinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;
  constructor() {
    this.length = 0;
    this.head = this.tail = undefined;
  }

  prepend(item: T): void {
    const node: Node<T> = { value: item };
    this.length++;
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
    return;
  }
  insertAt(item: T, idx: number): void {
    if (idx > this.length) {
      throw new Error("idx out of range");
    }

    if (idx === this.length) {
      this.append(item);
      return;
    }
    if (idx === 0) {
      this.prepend(item);
      return;
    }

    let node = this.getAt(idx);

    if (!node) {
      return;
    }
    const newNode: Node<T> = { value: item };
    this.length++;

    newNode.next = node;
    newNode.prev = node.prev;
    node.prev = newNode;

    if (newNode.prev) {
      newNode.prev.next = newNode;
    }
  }
  append(item: T): void {
    const node: Node<T> = { value: item };
    this.length++;
    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;

    return;
  }
  remove(item: T): T | undefined {
    let node = this.head;

    for (let i = 0; i < this.length && node; ++i) {
      if (item === node.value) {
        break;
      }
      node = node.next;
    }
    if (!node) {
      return;
    }

    return this.removeNode(node);
  }

  removeAt(idx: number): T | undefined {
    if (idx > this.length) {
      throw new Error("idx out of range");
    }

    let node = this.getAt(idx);

    if (!node) {
      return;
    }

    return this.removeNode(node);
  }

  private removeNode(node: Node<T>): T | undefined {
    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node === this.head) {
      this.head = node.next;
    }

    if (node === this.tail) {
      this.tail = node.prev;
    }

    this.length--;
    if (this.length === 0) {
      this.head = this.tail = undefined;
    }

    node.next = node.prev = undefined;

    return node.value;
  }

  get(idx: number): T | undefined {
    return this.getAt(idx)?.value;
  }
  private getAt(idx: number): Node<T> | undefined {
    let node = this.head;
    for (let i = 0; i < idx && node?.next; ++i) {
      node = node.next;
    }

    return node;
  }
}
