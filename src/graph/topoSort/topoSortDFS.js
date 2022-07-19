/* 

 Topological Sort : Linear ordering of the vertices such that if there is and edge u --> v, u appears before v in that ordering.
{
  0: [],
  1: [],
  2: [3],
  3: [1],
  4: [0, 1],
  5: [0, 2]
}

One of the topo sort === 5 --> 4 --> 2 --> 3 --> 1 --> 0
Points to remember
1. There can be multiple topo sort available for the same graph.
2. Graph should be directed Acyclic Graph(DAG).
   because undirected graph can't tell if there is an edge b/w a -->b or b --> a 
   and if there is a cycle then we can't keep linear ordering maintained.
*/


const topologicalSort = (graph) => {
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
  for (let neighbor of neighbors) {
    if (!(visited.has(neighbor))) {
      dfs(graph, visited, neighbor, stack);
    }
  }
  stack.push(vertex);
}

const graph = [
  [],
  [],
  [3],
  [1],
  [0, 1],
  [0, 2]
]
console.log(topologicalSort(graph))

