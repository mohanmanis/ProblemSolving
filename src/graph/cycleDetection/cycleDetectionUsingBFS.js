/* 
  Find Cycle using Kahn's Algorithm.
  Since we know that a cyclic graph can not generate the topological sort.
  So, here we try to find the topo sort if we are unable then that means that we have a cycle in the graph.

  If number of elements in the topo sort is more than the nodes 
  present then that means we have a  cycle, so we will introduce a variable called count

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
  let count = 0; // varible to track the number of nodes in the topo
  while (queue.length) {
    const node = queue.shift();
    count++;
    const neighbors = graph[node];
    topologicalSortResult.push(node);
    for (const neighbor of neighbors) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) {
        queue.push(neighbor)
      }
    }
  }
  if (count === n) return false; // This will happen only when there is no cycle as count of elements would be equal to the number of vertices/nodes.
  return true;
}
