/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  let n = graph.length;
  let color = Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    if (color[i] == -1) {
      // if (!checkBipartiteThroughBFS(graph, i, color)) {
      //   return false;
      // }
      if (!checkBipartiteThroughDFS(graph, i, color)) {
        return false;
      }
    }
  }
  return true;
};

const checkBipartiteThroughBFS = (graph, src, color) => {
  let queue = [src];
  color[src] = 1;
  while (queue.length > 0) {
    let node = queue.shift();
    const neighbors = graph[node];
    for (let neighbor of neighbors) {
      if (color[neighbor] === -1) {
        queue.push(neighbor);
        color[neighbor] = 1 - color[node];
      } else if (color[neighbor] === color[node]) {
        return false;
      }
    }
  }
  return true;
}
const checkBipartiteThroughDFS = (graph, src, color) => {
  if (color[src] === -1) {
    color[src] = 1;
  }
  const neighbors = graph[src];

  for (let neighbor of neighbors) {
    if (color[neighbor] === -1) {
      color[neighbor] = 1 - color[src];
      if (!(checkBipartiteThroughDFS(graph, neighbor, color))) {
        return false;
      }
    } else if (color[neighbor] === color[src]) {
      return false;
    }
  }
  return true;
}