// cyclic needs at least 3 nodes to form a cycle
// nodes = vertexes
// symmetrical/asymmetrical
// weighted
// directed
// dag (direct, acyclic graph)
// representration through Adjacency List/Matrix (mostly List because Matrix has O(V²))
//  [
//     [{to: 1, weight: 10}, {to: 3, weight: 5}],
//     [],
//     [{to: 0, weight: 20}],
//     [{..}, {..}]
// ]
// Graphs support DFS and BFS

type GraphEdge = {
  to: number;
  weight: number;
};
type WeightedAdjacencyMatrix = number[][];
type WeightedAdjacencyList = GraphEdge[][];

// BreadthFirstSearch on AdjacencyMatrix
function search(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number
): number[] | null {
  const q = [source];
  const prev: number[] = new Array(graph.length).fill(-1); // where I came from
  const seen: boolean[] = new Array(graph.length).fill(false); // what have I seen
  seen[source] = true;

  do {
    const vertex = q.shift();
    if (vertex === undefined) {
      break;
    }

    // we found it
    if (vertex === needle) {
      break;
    }
    const edges = graph[vertex];
    for (let i = 0; i < edges.length; ++i) {
      if (edges[i] === 0 || seen[i]) {
        continue;
      }

      seen[i] = true;
      prev[i] = vertex;
      q.push(i);
    }
  } while (q.length);

  let current = needle;
  // We don't have a path to needle
  if (prev[current] === -1) {
    return null;
  }
  const path: number[] = [];

  while (prev[current] !== -1) {
    path.push(current);
    current = prev[current];
  }

  return [source].concat(path.reverse());
}

export function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number
): number[] | null {
  return search(graph, source, needle);
}

// DepthFirstSearch on AdjacencyList
// O(V+E)
function walk(
  graph: WeightedAdjacencyList,
  current: number,
  needle: number,
  seen: boolean[],
  path: number[]
): boolean {
  if (seen[current]) {
    return false;
  }

  // pre
  path.push(current);
  seen[current] = true;

  if (current === needle) {
    return true;
  }

  // recurse
  const edges = graph[current];
  for (let i = 0; i < edges.length; ++i) {
    if (walk(graph, edges[i].to, needle, seen, path)) {
      return true;
    }
  }
  // post
  path.pop();

  return false;
}

export function dfs(
  graph: WeightedAdjacencyList,
  source: number,
  needle: number
): number[] | null {
  const path: number[] = [];
  const seen: boolean[] = new Array(graph.length).fill(false);
  walk(graph, source, needle, seen, path);
  return path.length > 0 ? path : null;
}

//  Dijkstra shortest path
// No negative weights on Dijkstra
function hasUnvisited(seen: boolean[], distances: number[]): boolean {
  // let has = false;
  // for (let i = 0; i < seen.length; i++) {
  //     if (!seen[i] && distances[i] < Infinity) {
  //         has = true;
  //         break;
  //     }
  // }
  // return has;
  return seen.some((s, i) => !s && distances[i] < Infinity);
}

function getLowestUnvisited(seen: boolean[], distances: number[]): number {
  let idx = -1;
  let lowestDistance = Infinity;
  for (let i = 0; i < distances.length; ++i) {
    if (seen[i]) {
      continue;
    }

    if (lowestDistance > distances[i]) {
      lowestDistance = distances[i];
      idx = i;
    }
  }

  return idx;
}
export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  const prev: number[] = new Array(arr.length).fill(-1); // where I came from
  const seen: boolean[] = new Array(arr.length).fill(false);
  const distances: number[] = new Array(arr.length).fill(Infinity);
  distances[source] = 0;
  // total O(V² + E) or O(log V(V+E)) with MinHeap
  // O(V²) or O (log V) with MinHeap
  while (hasUnvisited(seen, distances)) {
    // O(V²) or O (log V) with MinHeap
    const current = getLowestUnvisited(seen, distances);
    seen[current] = true;

    const edges = arr[current];
    // O(E) for AdjacencyLists
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];

      if (seen[edge.to]) {
        continue;
      }

      // Distance to next vertex
      const distance = distances[current] + edge.weight;

      // Update shortest distance
      if (distance < distances[edge.to]) {
        distances[edge.to] = distance;
        prev[edge.to] = current;
      }
    }
  }

  let current = sink;

  const path: number[] = [];
  while (prev[current] !== -1) {
    path.push(current);
    current = prev[current];
  }
  path.push(source);
  return path.reverse();
}
