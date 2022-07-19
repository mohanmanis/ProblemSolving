
/* 
  We will calculate the shortest distance of the each point from the source and keep it in the distance array. 

*/


const shortestPath = (adj, n, src) => {
  let distance = Array(n).fill(Number.MAX_VALUE);
  let queue = [];
  distance[src] = 0; // distance from source is 0;
  queue.push(src);
  while (queue.length) {
    let node = queue.shift();
    const neighbors = adj[node];
    for (let neighbor of neighbors) {
      if (distance[node] + 1 < distance[neighbor]) {
        distance[neighbor] = distance[node] + 1;
        queue.push(neighbor);
      }
    }
  }
  return distance;
}