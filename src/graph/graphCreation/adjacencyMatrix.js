/* 
Given number of nodes --> n, number of edges --> m
 steps
 1. Check the number of nodes and then check whether nodes are 0 based or 1 based indexing
 2. create a 2d matrix mat[m + 1][m + 1] with value 0, if nodes are 1 based indexing.
 3. iterate over the list of edges and fill the matrix
    let say edge [1, 2] the fill mat[1][2] = 1 also mat[2][1] = 1 if it is undirected graph

  Some downsides are if number of nodes is very high then it would be difficult to store such a large matrix. if n is 10^5 then size would be 10^5 * 10^5


*/

const adjacencyMatrix = (n, edges) => {
  const len = m.length;
  const mat = Array(n + 1).fill(null).map(_ => Array(len + 1).fill(0));

  for (let [u, v] of edges) {
    mat[u][v] = 1;
    mat[v][u] = 1; // since it is undirected graph
  }
  return mat;
}