// Heap = Binary Tree where most right child is the smallest (MinHeap) or biggest (MaxHeap)
// heaps are weak ordered, self balancing and can be used for priority
// Stored in an ArrayList
// left child = 2i+1, right child = 2i+2
// parent = floor((i-1)/2)
// heapifyDown(0) & heapifyUp(length)
// insert & delete has O(log n)

export default class MinHeap {
  public length: number;
  private data: number[];

  constructor() {
    this.length = 0;
    this.data = [];
  }

  insert(value: number): void {
    this.data.push(value); // this.data[this.length] = value;
    this.heapifyUp(this.length);
    this.length++;
  }
  // poll or pop
  delete(): number {
    if (this.length === 0) {
      return -1;
    }

    const out = this.data[0];
    this.length--;
    if (this.length === 0) {
      this.data = [];
      return out;
    }
    // Reduce length before heapifying
    this.data[0] = this.data[this.length];
    this.heapifyDown(0);
    return out;
  }

  private heapifyDown(idx: number): void {
    const rIdx = this.right(idx);
    const lIdx = this.left(idx);
    if (idx >= this.length || lIdx >= this.length) {
      return;
    }

    const lV = this.data[lIdx];
    const rV = this.data[rIdx];
    const v = this.data[idx];

    if (lV > rV && v > rV) {
      this.data[idx] = rV;
      this.data[rIdx] = v;
      this.heapifyDown(rIdx);
    } else if (rV > lV && v > lV) {
      this.data[idx] = lV;
      this.data[lIdx] = v;
      this.heapifyDown(lIdx);
    }
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) {
      return;
    }

    const pIdx = this.parent(idx);
    const v = this.data[idx];
    const pV = this.data[pIdx];
    if (pV > v) {
      this.data[pIdx] = v;
      this.data[idx] = pV;
      this.heapifyUp(pIdx);
      return;
    }
  }
  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private left(idx: number): number {
    return 2 * idx + 1;
  }

  private right(idx: number): number {
    return 2 * idx + 2;
  }
}
