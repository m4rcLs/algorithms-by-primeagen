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

// Quicksort has O(n log n) to O(n²) (for reversed sorted arrays)
// Merge Sort has high constant factor in pre for memcopying arrays
function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let idx = low - 1;

  for (let i = low; i < high; ++i) {
    // Sorting everything left to the pivot
    if (arr[i] <= pivot) {
      idx++;
      const tmp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = tmp;
    }
  }

  // Move the pivot
  idx++;
  arr[high] = arr[idx];
  arr[idx] = pivot;
  return idx;
}

function qs(arr: number[], low: number, high: number): void {
  // Base case
  if (low >= high) {
    return;
  }

  const pivotIdx = partition(arr, low, high);

  qs(arr, low, pivotIdx - 1);
  qs(arr, pivotIdx + 1, high);
}

export default function quick_sort(arr: number[]): void {
  qs(arr, 0, arr.length - 1);
}
