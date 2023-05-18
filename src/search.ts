//  halving inputs (N) almost always O(log N) or O(N log N)
function linear_search(haystack: number[], needle: number): boolean {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) {
      return true;
    }
  }

  return false;
}

function bs_list(haystack: number[], needle: number): boolean {
  let low = 0;
  let high = haystack.length;
  do {
    let middle = Math.floor(low + (high - low) / 2);
    let value = haystack[middle];

    if (value === needle) {
      return true;
    }

    if (value > needle) {
      high = middle;
    } else {
      low = middle + 1;
    }
  } while (low < high);
  return false;
}

function two_crystal_balls(breaks: boolean[]): number {
  const distance = Math.floor(Math.sqrt(breaks.length));
  // My solution
  // for (let i = 0; i * distance < breaks.length; i++) {
  //     let jump = i * distance;
  //     if (breaks[jump]) {
  //         for (let j = jump; j > 0; j--) {
  //             if (!breaks[j]) {
  //                 return j + 1;
  //             }
  //         }
  //     }
  // }
  let i = distance;
  // Find the break by jumping sqrt(N)
  for (; i < breaks.length; i += distance) {
    if (breaks[i]) {
      break;
    }
  }

  // Jump to previous point
  i -= distance;

  // And walk from there atmost sqrt(N)
  for (let j = 0; j < distance && i < breaks.length; ++j, ++i) {
    if (breaks[i]) {
      return i;
    }
  }

  return -1;
}
