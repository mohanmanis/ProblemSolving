//Depth first Search using recursion

const depthFirstPrint = (graph, source)=>{
  console.log(source);
  for (const neighbor of graph[source]) {
    depthFirstPrint(graph, neighbor);
  }
}

const graph = {
  a: ["b", "c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: []
}

console.log(depthFirstPrint(graph, "a"));

//Depth first Search using recursion

const depthFirstPrintUsingIteration = (graph, source) => {
  const stack = [source];
  while (stack.length > 0) {
    const current = stack.pop();
    console.log(current);
    for (const neighbor of graph[current]) {
      stack.push(neighbor);
    }
  };
};

console.log(depthFirstPrintUsingIteration(graph, "a"));



