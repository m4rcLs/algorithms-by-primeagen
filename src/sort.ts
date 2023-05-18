// 1..100 => 1 + 100, 2+99 ... 50 + 51 => 101 * 50
// bubble sort => O(n²)

function bubble_sort(arr: number[]): void {
  // for (let i = arr.length; i > 0; i--) {
  //     for (let j = 0; j < i; j++) {
  //         const a = arr[j];
  //         const b = arr[j + 1];
  //         if (a > b) {
  //             arr[j + 1] = a;
  //             arr[j] = b;
  //         }
  //         loop++;
  //     }
  // }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      const a = arr[j];
      const b = arr[j + 1];
      if (a > b) {
        arr[j + 1] = a;
        arr[j] = b;
      }
    }
  }
}
