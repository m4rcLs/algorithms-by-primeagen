// load factor: amount of data points vs amount of storage (data.len / storage.capacity)
// key: hashable value used to look up data. hash must be consistent
// value: value associated with the key
// collision: 2 keys map to same cell
// hash(K) => unique number
// unique number % len(ArrayList) = ArrayListIndex
// ArrayList[ArrayList] to handle collisions (optimal load factor 0.7)
