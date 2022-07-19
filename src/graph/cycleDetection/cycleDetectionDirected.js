const hasCycle = (graph, node, visited) => {
  if (visited[node] === true) {
    return false;
  }
  if (visited[node] === "safe") {
    return true;
  }

  visited[node] = true;
  const neighbors = graph[node];
  for (let neighbor of neighbors) {
    if (!isNodeSafe(graph, neighbor, visited)) {
      return false;
    }
  }
  visited[node] = "safe";
  return true;
}