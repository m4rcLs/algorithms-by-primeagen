// preOrder, inOrder, postOrder Traversals
// visitNode(), recurseLeft(), recurseRight() => preOrder (root i = start)
// recurseLeft(), visitNode(), recurseRight() => inOrder (root i = middle)
// recurseLeft(), recurseRight(), visitNode() => postOrder (root i = end, used for freeing memory)

function traverse(node: BinaryNode<number>, numbers: number[]): void {
  //  Base Case
  if (!node) {
    return;
  }

  if (node.left === null && node.right === null) {
    numbers.push(node.value);
    return;
  }

  numbers.push(node.value);
  if (node.left) {
    traverse(node.left, numbers);
  }
  if (node.right) {
    traverse(node.right, numbers);
  }
}

// primeagen
function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
  if (!curr) {
    return path;
  }

  // pre
  // path.push(curr.value); // PreOrder
  // recurse
  walk(curr.left, path);
  path.push(curr.value); // InOrder
  walk(curr.right, path);
  // post
  // path.push(curr.value); // PostOrder

  return path;
}

export function in_order_search(head: BinaryNode<number>): number[] {
  return walk(head, []);
}

// Depth-First = Stack; Breadth-First = Queue
// Depth-First preserves shape of the tree, Breadth-First not
// BinarySearchTree (BST), Annahme: left <= Root < right
// find() => O(height) (log h for balanced tree; h for worst case)
// How to balance a BST? AVL (read often, write rarely) and Red-Black Trees (write often, read rarely)?
// delete case
// 1) no child: simple delete
// 2) one child: set parent to child
// 3) two children: replace with largest on smallest side or smallest on large side

type BinaryNode<T> = {
  value: T;
  left: BinaryNode<T> | null;
  right: BinaryNode<T> | null;
};
// DepthFirstSearch on BinarySearchTree
function search(node: BinaryNode<number> | null, needle: number): boolean {
  if (!node) {
    return false;
  }

  if (node.value === needle) {
    return true;
  }

  if (needle > node.value) {
    return search(node.right, needle);
  }
  return search(node.left, needle);
}

export function dfs(head: BinaryNode<number>, needle: number): boolean {
  return search(head, needle);
}

// Compare binary trees
export function compare(
  a: BinaryNode<number> | null,
  b: BinaryNode<number> | null
): boolean {
  // BaseCases
  if (a === null && b === null) {
    return true;
  }

  if (a === null || b === null) {
    return false;
  }

  if (a.value !== b.value) {
    return false;
  }

  // My solution
  // if (!compare(a.left, b.left)) {
  //     return false;
  // }

  // if (!compare(a.right, b.right)) {
  //     return false;
  // }

  // return true;

  return compare(a.left, b.left) && compare(a.right, b.right);
}

// Binary Tree BreadthFirstSearch

function myBfs(head: BinaryNode<number>, needle: number): boolean {
  const q: BinaryNode<number>[] = [head];

  while (q.length > 0) {
    const current = q.shift();
    if (!current) {
      return false;
    }
    if (current.value === needle) {
      return true;
    }

    if (current.left) {
      q.push(current.left);
    }

    if (current.right) {
      q.push(current.right);
    }
  }

  return false;
}

function primeAgenBfs(head: BinaryNode<number>, needle: number): boolean {
  const q: (BinaryNode<number> | null)[] = [head];

  while (q.length > 0) {
    const current = q.shift();
    if (!current) {
      continue;
    }
    if (current.value === needle) {
      return true;
    }

    q.push(current.left);
    q.push(current.right);
  }

  return false;
}
export function bfs(head: BinaryNode<number>, needle: number): boolean {
  return myBfs(head, needle);
}
