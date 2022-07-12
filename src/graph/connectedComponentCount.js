const graph = {
  0: [8, 1, 5],
  1: [0],
  5: [0, 8],
  8: [0, 5],
  2: [3, 4],
  3: [2, 4],
  4: [3, 2]
}; // --> 2

const connectedComponentCount = (graph) => {
  let count = 0;
  const visited = new Set();
  for (const node in graph) {
    if (explore(graph, +node, visited)) {
      count++;
    };
  }
  return count;
}

const explore = (graph, current, visited) => {
  if (visited.has(current)) {
    return false
  }
  visited.add(current);
  for (const neighbor of graph[current]) {
    explore(graph, neighbor, visited);
  }
  return true;
}

console.log(connectedComponentCount(graph));