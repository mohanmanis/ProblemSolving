/* 

****Bellman Ford Algorithm | Detect Negative Weight Cycle in Graphs****
In a graph with N vertices, there are at most N - 1 edges b/w any two vertices
 it works for negative edges.
 1. Works for Directed graph
 2. It will not work for graph having a negative cycle. // it will go to infinite loop
 3. This algo helps in finding the negative cycle.

 Steps
 1. Relax all of the edges n - 1 times
  if (dis[u] + wt < dis[v])
     dist[v] = dist[u] + wt;
 2. After relaxing n - 1 times minimum will remain same. But if it still reduces
 then that means it has negative cycle.

*/


const bellmanFordAlgo = (edges, src) => {
  const n = graph.length;
  let distance = Array(n - 1).fill(Infinity);
  distance[src] = 0;
  for (let i = 1; i <= n; i++) {
    for (const [x, y, weight] of edges) {
      distance[y] = Math.min(distance[y], distance[x] + weight)
    }
  }
  let isNegativeCycle = false;
  for (const [x, y, weight] of edges) {
    if (distance[y] >  (distance[x] + weight)) {
      distance[y] = distance[x] + weight;
      isNegativeCycle = true;
      console.log("negative cycle detected");
      break;
    }
  }
  return isNegativeCycle ? 0 : distance;
}
const graph = [
  [3, 2, 6],
  [5, 3, 1],
  [0, 1, 5],
  [1, 5, -3],
  [1, 2, -2],
  [3, 4, -2],
  [2, 4, 3]
]
console.log(bellmanFordAlgo(graph, 0));