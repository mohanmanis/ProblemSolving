/* 
 Topological sorting using Kahn's Algorithm (BFS)

 BFS require two things 
  1. Array(Indegree) Indegree--> Number of edges coming into some node
  ex:: Array(vertices).fill(0)

  2. Take a queue and add every vertices having indegree as 0

  3. Take the nodes from the queue and the mark that as element of topoSort.

  4. After that traverse the adjacent neighbors of that node and reduce the indegree of them 1, if indegree for neighbor becomes 0 in that process then put that node into the queue.

  5. Repeat the step 3 and 4 until queue is empty.

*/
const topologicalSort = (graph) => {
  const n = graph.length, topologicalSortResult = [], queue = [];
  const indegree = Array(n).fill(0)

  for (let v = 0; v < n; v++) {
    const neighbors = graph[v];
   for (const neighbor of neighbors) {
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
    for (const neighbor of neighbors) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) {
        queue.push(neighbor)
      }
    }
  }
  return topologicalSortResult;
}

const graph = [
  [],
  [],
  [3],
  [1],
  [0, 1],
  [0, 2]
]
console.log(topologicalSort(graph));