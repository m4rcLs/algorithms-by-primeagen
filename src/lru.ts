// LRU - Least Recently Used
// Map + DoublyLinkedList (constant times for lookup and inserting/updating)

// my lru
type Node<K, T> = {
  value: T;
  next?: K;
  prev?: K;
};
export default class LRU<K, V> {
  public length: number;
  public head?: K;
  public tail?: K;
  public map: Map<K, Node<K, V>>;

  constructor(private capacity: number = 10) {
    this.length = 0;
    this.head = this.tail = undefined;
    this.map = new Map<K, Node<K, V>>();
  }

  debug(): void {
    const list = [];
    let key: K | undefined = this.head;
    while (key && this.map.has(key)) {
      const node = this.map.get(key)!;
      list.push(node);
      key = node.next;
    }
    console.log({
      head: this.head,
      tail: this.tail,
      list,
      map: this.map,
      length: this.length,
    });
  }

  evict(): void {
    if (this.tail === undefined || !this.length || !this.map.has(this.tail)) {
      return;
    }
    const tailNode = this.map.get(this.tail)!;
    this.map.delete(this.tail);
    this.length--;
    // Tails prev becomes new tail
    if (tailNode.prev && this.map.has(tailNode.prev)) {
      let prevNode = this.map.get(tailNode.prev)!;
      prevNode.next = undefined;
      this.tail = tailNode.prev;
    }
  }
  private updateHead(key: K, node: Node<K, V>): void {
    if (this.head === undefined) {
      return;
    }
    const head = this.map.get(this.head);

    // Something would've went wrong here
    if (!head) {
      console.log("Something went wrong");
      return;
    }

    // Update next if we have one
    if (node.next && this.map.has(node.next)) {
      const nextNode = this.map.get(node.next)!;
      nextNode.prev = node.prev;
      this.map.set(node.next, nextNode);
    }

    // Update prev if we have one
    if (node.prev && this.map.has(node.prev)) {
      const prevNode = this.map.get(node.prev)!;
      prevNode.next = node.next;
      this.map.set(node.prev, prevNode);
    }

    // Update head correctly
    head.prev = key;

    if (head.next === key) {
      head.next = node.next;
    }

    this.map.set(this.head, head);

    node.next = this.head;
    node.prev = undefined;
    // Update head
    this.head = key;
    this.map.set(key, node);
  }
  update(key: K, value: V): void {
    // Update existing node
    if (this.get(key)) {
      let node = this.map.get(key)!;
      node.value = value;
      this.map.set(key, node);
      return;
    }

    if (this.length === this.capacity) {
      this.evict();
    }

    this.length++;

    // First update
    if (this.head === undefined && this.tail === undefined) {
      this.head = this.tail = key;
      this.map.set(key, { value });
      return;
    }

    this.updateHead(key, { value });
  }
  get(key: K): V | undefined {
    const node = this.map.get(key);
    if (!node || this.head === undefined || this.tail === undefined) {
      return;
    }

    // Already most recently used
    if (key === this.head) {
      return node.value;
    }

    // Update tail
    if (key === this.tail && node.prev && this.map.has(node.prev)) {
      const newTail = this.map.get(node.prev)!;
      newTail.next = undefined;
      this.map.set(node.prev, newTail);
      this.tail = node.prev;
    }
    this.updateHead(key, node);
    return node.value;
  }
}

type PrimeNode<T> = {
  value: T;
  next?: PrimeNode<T>;
  prev?: PrimeNode<T>;
};
export default class PrimeLRU<K, V> {
  public length: number;
  public head?: PrimeNode<V>;
  public tail?: PrimeNode<V>;
  public lookup: Map<K, PrimeNode<V>>;
  public reverseLookup: Map<PrimeNode<V>, K>;

  constructor(private capacity: number = 10) {
    this.length = 0;
    this.head = this.tail = undefined;
    this.lookup = new Map<K, PrimeNode<V>>();
    this.reverseLookup = new Map<PrimeNode<V>, K>();
  }

  trimCache(): void {
    if (!this.tail) {
      return;
    }

    const tail = this.tail;
    this.detach(tail);
    const key = this.reverseLookup.get(tail);
    this.reverseLookup.delete(tail);
    if (key) {
      this.lookup.delete(key);
    }
    this.length--;
  }

  update(key: K, value: V): void {
    let node = this.lookup.get(key);
    if (node) {
      node.value = value;
      this.detach(node);
      this.prepend(node);
      return;
    }

    if (this.length === this.capacity) {
      this.trimCache();
    }
    this.length++;
    node = { value };
    this.prepend(node);
    this.lookup.set(key, node);
    this.reverseLookup.set(node, key);
  }
  get(key: K): V | undefined {
    let node = this.lookup.get(key);
    if (!node) {
      return;
    }

    this.detach(node);
    this.prepend(node);

    return node.value;
  }

  private detach(node: PrimeNode<V>) {
    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (this.head === node) {
      this.head = this.head.next;
    }

    if (this.tail === node) {
      this.tail = this.tail.prev;
    }

    node.next = node.prev = undefined;
  }

  private prepend(node: PrimeNode<V>) {
    if (node === this.head) {
      return;
    }

    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    this.head.prev = node;
    node.next = this.head;

    this.head = node;
  }
}
