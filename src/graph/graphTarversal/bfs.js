/* 
 As a thumb rule always iterate through the list and then call your traversal algorithm as graph can have multiple disconnected components.
 and keep track of visited nodes and if something is not visited then call your traversal algo

*/

const mainTraversal = (v, adj) => {
  let storeBFS = [];
  let visited = new Set();
  for (let i = 1; i <= v; i++) {
    if (!visited.has(i)) {
      bfs(i, adj, visited, storeBFS)
    }

  }
}


const bfs = (v, adj, visited, storeBFS) => {
  let queue = [];
  queue.push(v);
  visited.add(v);
  while (queue.length) {
    const node = q.shift();
    storeBFS.push(node);
    for (let node of adj[node]) {
      if (!visited.has(node)) {
        visited.add(node);
        queue.push(node);
      }
    }
  }
  return storeBFS;
}