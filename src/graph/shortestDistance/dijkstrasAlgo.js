
/* 

 It does not work for negative edges.


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


const dijkstras = (graph, src) => {
  let n = graph.length;
  console.log(graph)
  let distance = Array(n).fill(Infinity);
  distance[src] = 0;
  let priorityQueue = new MinHeap();
  priorityQueue.push(new HeapItem(src, 0));
  while (priorityQueue.size) {
    const { item: srcNode, priority: srcWeight } = priorityQueue.pop();
    const neighbors = graph[srcNode];
    //console.log(neighbors, srcNode, graph)
    for (const [neighbor, neighborWeight] of neighbors) {
      const newDistanceThroughSrc = srcWeight + neighborWeight;
      const currentDistance = distance[neighbor]
      if (newDistanceThroughSrc < currentDistance) {
        distance[neighbor] = newDistanceThroughSrc;
        priorityQueue.push(new HeapItem(neighbor, newDistanceThroughSrc));
      }
    }
  }
  return distance.slice(1); // we can remove the first one as it is 1 based indexing in the graph
}

const graph = [
  [],  //keeping this as empty as it is 1 based indexing, and can't ignore the 0 index
  [[2, 2], [4, 1]],
  [[1, 2], [5, 5], [3, 4]],
  [[2, 4], [4, 3], [5, 1]],
  [[1, 1], [3, 3]],
  [[2,5], [3,1]]
]
console.log(dijkstras(graph, src=1));


