class Heap {

  /**
   * Create a Heap
   * @param {function} compareFunction - compares child and parent element
   * to see if they should swap.  If return value is less than 0 it will
   * swap to prioritize the child.
   */
  constructor(compareFunction) {
    this.store = [];
    this.compareFunction = compareFunction;
  }

  peak() {
    return this.store[0];
  }

  get size() {
    return this.store.length;
  }

  pop() {
    if (this.size < 2) {
      return this.store.pop();
    }
    const result = this.store[0];
    this.store[0] = this.store.pop();
    this.heapifyDown(0);
    return result;
  }

  push(val) {
    this.store.push(val);
    this.heapifyUp(this.size - 1);
  }

  heapifyUp(child) {
    while (child) {
      const parent = Math.floor((child - 1) / 2);

      if (this.shouldSwap(child, parent)) {
        [this.store[child], this.store[parent]] = [this.store[parent], this.store[child]]
        child = parent;
      } else {
        return child;
      }
    }
  }

  heapifyDown(parent) {
    while (true) {
      let [child, child2] = [1, 2].map((x) => parent * 2 + x).filter((x) => x < this.size);
      if (this.shouldSwap(child2, child)) {
        child = child2;
      }

      if (this.shouldSwap(child, parent)) {
        [this.store[child], this.store[parent]] = [this.store[parent], this.store[child]]
        parent = child;
      } else {
        return parent;
      }
    }
  }

  shouldSwap(child, parent) {
    return child && this.compareFunction(this.store[child], this.store[parent]) < 0;
  }
}


var assignTasks = function (servers, tasks) {
  const n = servers.length;
  const m = tasks.length;

  // The freeServers are prioritized by the min. weights and then their indexes
  const freeServers = new PriorityQueue((a, b) => a.weight - b.weight || a.index - b.index);

  for (let index = 0; index < n; ++index) {
    const weight = servers[index];

    freeServers.enqueue({ endTime: -1, weight, index });
  }

  // Working servers are prioritized by their ending time.
  const workingServers = new PriorityQueue((a, b) => a.endTime - b.endTime);

  const res = [];

  let secs = 0;
  let taskIdx = 0;

  while (taskIdx < m) {

    while (!workingServers.isEmpty() && workingServers.peek().endTime === secs) {
      const popped = workingServers.dequeue();
      freeServers.enqueue(popped);
    }

    if (!freeServers.isEmpty()) {
      while (!freeServers.isEmpty() && taskIdx < m && taskIdx <= secs) { // we can batch assign the free servers to the available tasks
        const topServer = freeServers.dequeue();

        res[taskIdx] = topServer.index;

        topServer.endTime = secs + tasks[taskIdx];

        workingServers.enqueue(topServer);

        ++taskIdx;
      }

      secs++;

    } else {
      // If we don't have any free servers, we can jump our time all the way to the earliest ending working server
      secs = workingServers.peek().endTime;
    }
  }

  return res;
};

class PriorityQueue {
  constructor(compare) {
    this.compare = compare; // compare function
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    return this.heap[0];
  }

  getLeftIndex(index) {
    return index * 2 + 1;
  }

  getRightIndex(index) {
    return index * 2 + 2;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  enqueue(val) {
    this.heap.push(val);
    this.swim(this.heap.length - 1);
  }

  swim(index) {
    let parentIdx = this.getParentIndex(index);

    while (index > 0 && this.compare(this.heap[parentIdx], this.heap[index]) > 0) {
      this.swap(parentIdx, index);

      index = parentIdx;
      parentIdx = this.getParentIndex(index);
    }

    return;
  }

  dequeue() {
    const min = this.heap[0];
    this.swap(0, this.size() - 1);
    this.heap.pop();
    this.sink(0);

    return min;
  }

  sink(index) {
    let minIdx = index;

    const size = this.size();
    const leftIdx = this.getLeftIndex(minIdx);
    const rightIdx = this.getRightIndex(minIdx);

    if (leftIdx < size && this.compare(this.heap[minIdx], this.heap[leftIdx]) > 0) {
      minIdx = leftIdx;
    }

    if (rightIdx < size && this.compare(this.heap[minIdx], this.heap[rightIdx]) > 0) {
      minIdx = rightIdx;
    }

    if (index != minIdx) {
      this.swap(index, minIdx);
      this.sink(minIdx);
    }

    return;
  }
}