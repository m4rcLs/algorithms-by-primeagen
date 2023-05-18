// Function calls itself until it meets it's "base case"
function foo(n: number): number {
  // Base Case
  if (n === 1) {
    return 1;
  }
  // 1. pre
  console.log("We shall recurse");
  // 2. recurse
  const out = n + foo(n - 1);
  // 3. post
  console.log(out);
  return out;
}

foo(5);
// returnAddress, returnValue, Arguments
// foo5, 5+, 5  ^
// foo4, 4+, 4  |
// foo3, 3+, 3  |
// foo2, 2+, 2  |
// foo1, 1,  1  |
// Recursion = pre: n+; recurse: ___; post

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

type Point = {
  x: number;
  y: number;
};
function walk(
  maze: string[],
  wall: string,
  current: Point,
  end: Point,
  seen: boolean[][],
  path: Point[]
): boolean {
  // Out of bounds
  if (
    current.y < 0 ||
    current.y >= maze.length ||
    current.x < 0 ||
    current.x >= maze[current.y].length
  ) {
    return false;
  }

  // Current is the end
  if (current.x === end.x && current.y === end.y) {
    path.push(end);
    return true;
  }

  // Hit Wall
  if (maze[current.y][current.x] === wall) {
    return false;
  }

  // Already visited
  console.log(current);
  if (seen[current.y][current.x]) {
    return false;
  }

  // pre
  seen[current.y][current.x] = true;
  path.push(current);
  // recurse
  for (let i = 0; i < directions.length; ++i) {
    const [x, y] = directions[i];
    if (
      walk(
        maze,
        wall,
        {
          x: current.x + x,
          y: current.y + y,
        },
        end,
        seen,
        path
      )
    ) {
      return true;
    }
  }

  // post
  path.pop();
  return false;
}

export default function solve(
  maze: string[],
  wall: string,
  start: Point,
  end: Point
): Point[] {
  // base cases
  // 1. it's a wall
  // 2. off the map
  // 3. the end
  // 4. already visited
  const path: Point[] = [];
  const seen: boolean[][] = [];
  for (let i = 0; i < maze.length; ++i) {
    seen.push(new Array(maze[0].length).fill(false));
  }
  walk(maze, wall, start, end, seen, path);

  return path;
}
