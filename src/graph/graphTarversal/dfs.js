/* 
 As a thumb rule always iterate through the list and then call your traversal algorithm as graph can have multiple disconnected components.
 and keep track of visited nodes and if something is not visited then call your traversal algo

*/

const mainTraversal = (v, adj) => {
  let storeDFS = [];
  let visited = new Set();
  for (let i = 1; i <= v; i++) {
    if (!visited.has(i)) {
      dfs(i, adj, visited, storeDFS);
    };

  };
};


const dfs = (v, adj, visited, storeDFS) => {
  storeDFS.push(v);
  visited.add(v);
  for (let node of adj[node]) {
    if (!visited.has(node)) {
      dfs(v, adj, visited, storeDFS);
    }
  };
  return storeDFS;
};