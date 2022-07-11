class HeapItem {
 constructor(item, priority = item) {
  this.item = item;
  this.priority = priority;
 }
}

class MaxHeap {
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
   if (parent.priority > element.priority) break;
   // if the parent is smaller than the child then swap the parent and child
   this.heap[index] = parent;
   this.heap[parentIndex] = element;
   index = parentIndex;
  }
 }

 pop() {
  const max = this.heap[0];
  this.heap[0] = this.heap[this.size - 1]; // keep the last element on the top of the heap
  this.heap.pop(); // removed the last element
  this.bubble_down(); // compare with the children and find the exact position of the parent
  return max; // return the value at the top, which we have stored initially in max. 
 }

 bubble_down() {
  let index = 0;
  let max = index;
  const n = this.heap.length;

  while (index < n) {
   const left = 2 * index + 1;
   const right = left + 1;

   if (left < n && this.heap[left].priority > this.heap[max].priority) {
    max = left;
   }
   if (right < n && this.heap[right].priority > this.heap[max].priority) {
    max = right;
   }
   if (max === index) break;
   [this.heap[max], this.heap[index]] = [this.heap[index], this.heap[max]];
   index = max;
  }
 }

 peek() {
  return this.heap[0];
 }

 get size() {
  return this.heap.length;
 }
}

const heap = new MaxHeap();
heap.push(new HeapItem(25))
heap.push(new HeapItem(5))
heap.push(new HeapItem(48))
heap.push(new HeapItem(78))
heap.push(new HeapItem(90))
heap.push(new HeapItem(44))
heap.pop();
heap.pop()
console.log(Array.from(heap.heap).map(({ item }) => item).join(","))
