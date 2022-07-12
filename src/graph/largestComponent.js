const graph = {
  0: ["8", "1", "5"],
  1: ["0"],
  5: ["0", "8"],
  8: ["0", "5"],
  2: ["3", "4"],
  3: ["2", "4"],
  4: ["3", "2"],
}



const largestComponent = (graph) => {
  const visited = new Set();
  let longest = 0;
  for (const node in graph) {
    const size = exploreSize(graph, node, visited);
    longest = Math.max(longest, size);
  }
  return longest
}

const exploreSize = (graph, node, visited) => {
  if (visited.has(node)) return 0;
  let size = 1;
  visited.add(node);

  for (const neighbor of graph[node]) {
    size += exploreSize(graph, neighbor, visited);
    }
  return size;
}

console.log(largestComponent(graph));