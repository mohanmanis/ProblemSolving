const edges = [
  ["w", "x"],
  ["x", "y"],
  ["z", "y"],
  ["z", "v"],
  ["w", "v"]
]; // --> 

const shortestPath = (edges, src, dst) => {
  const graph = buildGraph(edges)
  let queue = [[src, 0]];
  const visited = new Set([src]);
  while (queue.length > 0) {
    const [node, distance] = queue.shift();
    if (node === dst) return distance;
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
      }
    }
  }
  return -1;
}

const buildGraph = (edges) => {
  const graph = {}
  for (const edge of edges) {
    const [a, b] = edge;
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }
  return graph;
}

console.log(shortestPath(edges, "w", "z"));