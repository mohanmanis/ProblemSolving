const graph = {
  f: ["g", "i"],
  g: ["h"],
  h: [],
  i: ["g", "k"],
  j: ["i"],
  k: []
}





const hasPathDFS = (graph, source, destination) => {
  if (source === destination) {
    return true;
  }
  for (const neighbor of graph[source]) {
    if (hasPathDFS(graph, neighbor, destination)) {
      return true;
    }
  }
  return false;
}
hasPathDFS(graph, "f", "k");

const hasPathBFS = (graph, src, dst) => {
  const queue = [src];
  while (queue.length > 0) {
    const current = queue.shift();

    if (current === dst) return true;

    for (const neighbor of graph[current]) {
      queue.push(neighbor);
    } 
  }
  return false;
}

hasPathBFS(graph, "f", "k");