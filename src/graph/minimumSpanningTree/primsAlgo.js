/* 
  Minimum Spanning tree(MST)
  
  1. It contains exactly N nodes and exactly n - 1 nodes.
  2. It doesn't have a cycle.
  3. Every node is reachable to every other node. It means that all nodes are connected.
  4. A graph can have multiple spanning tree having above property but the one which has minimum cost(sum of edge weight) among others is the minimum spanning tree.

  Prim's Algo

  1. It starts with first node.
  2. It checks the minimum edge among its adjacent edges for that node.
  3. After one minimum edge is found then take the corresponding node and repeat the step 2 for both of the nodes(starting and currently found)

  Prim’s algorithm is one way to find a minimum spanning tree by starting with a vertex and progressively choosing the best neighboring vertex without regard to the entire structure of the graph. When you do something like choosing the minimum edge weight for a local set of edges without regard to finding the absolute minimum to the whole structure, that is called a greedy algorithm.

 Note::  Are you trying to find an MST in a dense graph? Use Prim’s Algorithm.
*/
class HeapItem {
  constructor(item, priority = item) {
    this.item = item;
    this.priority = priority;
  }
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    // insert the new node at the end of the heap array
    this.heap.push(node);
    // find the correct position for the new node
    this.bubble_up();
  }

  bubble_up() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const element = this.heap[index];
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (parent.priority <= element.priority) break;
      // if the parent is bigger than the child then swap the parent and child
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  pop() {
    const min = this.heap[0];
    this.heap[0] = this.heap[this.size - 1];
    this.heap.pop();
    this.bubble_down();
    return min;
  }

  bubble_down() {
    let index = 0;
    let min = index;
    const n = this.heap.length;

    while (index < n) {
      const left = 2 * index + 1;
      const right = left + 1;

      if (left < n && this.heap[left].priority < this.heap[min].priority) {
        min = left;
      }
      if (right < n && this.heap[right].priority < this.heap[min].priority) {
        min = right;
      }
      if (min === index) break;
      [this.heap[min], this.heap[index]] = [this.heap[index], this.heap[min]];
      index = min;
    }
  }

  peek() {
    return this.heap[0];
  }

  get size() {
    return this.heap.length;
  }
}
const primsAlgo = (graph, startVertex) => {
  const length = graph.length;
  const visited = new Set();
  const distances = Array(length).fill(Number.POSITIVE_INFINITY);
  const parents = Array(length).fill(-1);
  let priorityQueue = new MinHeap();
  priorityQueue.push(new HeapItem(startVertex, 0));
  distances[0] = 0;


  for (let v = 0; v < length - 1; v++) {
    const { item: currentVertex } = priorityQueue.pop();
    visited.add(currentVertex);
    const neighbors = graph[currentVertex];
    for (const [neighbor, neighborWeight] of neighbors) {
      if (!visited.has(neighbor) && neighborWeight < distances[neighbor]) {
        parents[neighbor] = currentVertex;
        distances[neighbor] = neighborWeight;
        priorityQueue.push(new HeapItem(neighbor, neighborWeight));
      }
   }
  }
  return parents;
}

const graph = [
  [[1,2], [3, 6]],
  [[0, 2], [2, 3], [3, 8], [4, 5]],
  [[1, 3], [4, 7]],
  [[0, 6], [1, 8]],
  [[1, 5], [2, 7]]
]
console.log(primsAlgo(graph, 0));