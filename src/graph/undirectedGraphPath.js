const edges = [
  ["i", "j"],
  ["k", "i"],
  ["m", "k"],
  ["k", "l"],
  ["o", "n"]
]

const undirectedGraphPath = (edges, nodeA, nodeB) => {
  const graph = buildGraph(edges);
  return hasPath(graph, nodeA, nodeB, new Set());
}

const hasPath = (graph, src, dst, visited) => {
  if (src === dst) return true;
  if (visited.has(src)) return false;
  visited.add(src);
  for (const neighbor of graph[src]) {
    if (hasPath(graph, neighbor, dst, visited)) {
      return true;
    }
  }
  return false;
}

const buildGraph = (edges) => {
  const graph = {};
  for (const edge of edges) {
    const [a, b] = edge;
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }
  return graph;
}

console.log(undirectedGraphPath(edges, "j", "m"));

var generate = function (numRows) {
  const triangle = [[1]];
  for (let rowNum = 1; rowNum < numRows; rowNum++) {
    let currentRow = [];
    let previousRow = triangle[rowNum - 1];
    currentRow.push(1)
    for (let col = 1; col < previousRow.length; col++) {
      currentRow.push(previousRow[col - 1] + previousRow[col]);
    }
    currentRow.push(1)
    triangle.push(currentRow);
  }

  return triangle;
};