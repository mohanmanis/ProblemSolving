
const topologicalSortBFS = (graph) => {
  const n = graph.length, topologicalSortResult = [], queue = [];
  const indegree = Array(n).fill(0)

  for (let v = 0; v < n; v++) {
    const neighbors = graph[v];
    for (const [neighbor, weight] of neighbors) {
      indegree[neighbor]++;
    }
  }

  for (let v = 0; v < n; v++) {
    if (indegree[v] === 0) {
      queue.push(v)
    }
  }

  while (queue.length) {
    const node = queue.shift();
    const neighbors = graph[node];
    topologicalSortResult.push(node);
    for (const [neighbor, weight] of neighbors) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) {
        queue.push(neighbor)
      }
    }
  }
  return topologicalSortResult;
}
const topologicalSortUtilDFS = (graph) => {
  const n = graph.length;
  const stack = [];
  const visited = new Set();
  for (let vertex = 0; vertex < n; vertex++) {
    if (!(visited.has(vertex))) {
      dfs(graph, visited, vertex, stack);
    }
  }
  let result = [];
  while (stack.length) {
    result.push(stack.pop());
  }
  return result;
}

const dfs = (graph, visited, vertex, stack) => {
  const neighbors = graph[vertex];
  visited.add(vertex);
  for (let [neighbor, weight] of neighbors) {
    if (!(visited.has(neighbor))) {
      dfs(graph, visited, neighbor, stack);
    }
  }
  stack.push(vertex);
}

const shortestPath = (src, graph) => {
  const n = graph.length;
  let distance = Array(n).fill(Infinity);
  const topoSorted = topologicalSortBFS(graph);
  //const topoSorted = topologicalSortDFS(graph); // this will also work
  distance[src] = 0;
  while (topoSorted.length) {
    let node = topoSorted.shift();
    if (distance[node] != Infinity) {
      const neighbors = graph[node];
      for (const [neighbor, weight] of neighbors) {
        distance[neighbor] = Math.min((distance[node] + weight), distance[neighbor])
      }
    }
  }
  return distance;
}

const graph = [
  [[1, 2], [4, 1]],
  [[2, 3]],
  [[3, 6]],
  [],
  [[2, 2], [5, 4]],
  [[3, 1]],
]

console.log(shortestPath(0, graph));