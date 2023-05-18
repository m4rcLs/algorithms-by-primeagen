//  Single continuous memory space
// index = type bit size * i
// e. g. int32[3] => 96 bit; arr[1] starts at bit 33
// a + width * offset = O(1)
// Uint8Array.slice is deep copied, while Buffer.slice is shallow copied
const a = new ArrayBuffer(6);
const a8 = new Uint8Array(a);
a8[0] = 45;
a8[2] = 45;

const a16 = new Uint16Array(a);
a16[2] = 0x4545;

console.log({ a, a8, a16 });
