/* 
   input: n(number of nodes) edges(all of the edges)
   output :  list : [[1, 2, 3], [4, 5], [0, 5], []]
   1. create a 1 d array of length n + 1;
   Array(n + 1).fill(0)
   2. iterate over the edges
     if i == 0 and 
*/


const adjacencyList = (n, edges) => {
  const adj = Array(n).fill(null).map(_ => []);

  for (let [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  return adj;
}


let edges = [[0, 1], [0, 4], [1, 2], [1, 3], [1, 4], [2, 3], [3, 4]];
console.log(adjacencyList(5, edges))