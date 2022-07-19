const checkForCycleBFS = (adj, src, visited) => {
  const queue = [];
  queue.push([src, -1]);
  visited.add(src);
  while (queue.length) {
    let [node, parent] = queue.shift();
    const neighbors = adj[node];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push([neighbor, node]);
        visited.add(neighbor);
      } else if (parent === neighbor) {
        return true;
      }
    }
  }
  return false;
}

const isCycle = (vertexes, adj) => {
  const visited = new Set();
  for (let i = 0; i < vertexes; i++)
    if (!visited.has(i)) {
      if (checkForCycleBFS(adj, i, vis)) // use dfs or bfs
        return true;
    }
  return false;
}

const checkForCycleDFS = (adj, src, visited, parent) => {
  visited.add(src);
  const neighbors = adj[src];
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      if (checkForCycle(adj, neighbor, visited, src))
        return true; 
    } else if (neighbor != parent)
      return true; 
  }
  return false;
}