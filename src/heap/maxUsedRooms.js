

/* 
  Related quest: https://leetcode.com/problems/find-servers-that-handled-most-number-of-requests/
  There are K check up room in sequence (indexed 0 - K-1)in a long corridor and you are given the entry time of different patients and duration of check up in order.
  The check up room is assigned on the basis of closest check up room available to incoming patient.
  Once check up is finished it can be assigned again.
  Find the check up rooms which catered to maximum number of patients.

  Inputs:
  numRooms: 3 = K
  Appointment times: [1, 3, 5, 8, 19] => patients arrival time
  Appointment durations: [20, 3, 2, 9, 1] => time spent by a patient in a given room

  There are K check up room in sequence (indexed 0 - K-1)in a long corridor and you are given the entry time of different patients and duration of check up in order.
  The check up room is assigned on the basis of closest check up room available to incoming patient.
  Once check up is finished it can be assigned again.
  Find the check up rooms which catered to maximum number of patients.

  There is a Hospital which contain N rooms from 1 to N -1. There is a Queue of Patients outside the Hospital. Each patient will be served in a single room and each patient has a time duration that it will take for the treatment. The rooms are allocated to patients by the lowest index (if the room is free). Initially room1 will be given to the patient, then if the 2nd patient comes and the 1st room is still busy, then the room2 will be given to the 2nd patient. now suppose the 1st patient treatment is completed, and the room1 is free now, and a new patient comes, then room1 will be given to the new patient. Each Patient has a start time also (Consider this as appointment time for him, it needs not to be a time format, use Integer for this).

  The patients standing in the queue are in non decreasing order of their start time. means if the first patient start time = 1, then the second patient start time will be >= 1. Now the rooms will be allocated to each patients one by one. we have to calculate that by the end when all the patients are treatment done, Which is the room in which the maximum no of patients have been entered?

  Example:
  if N = 2 rooms, and the patients are = 3, which are below

  patient-1 = {start: 1, duration: 8}
  patient-2 = {start: 1, duration: 2}
  patient-3 = {start: 6, duration: 4}
  Now first patient will be assigned to room-1, second patient comes at the same time he will be allocated to room-2, now after time 2, room-2 will become free, but patient 3 will come at time 6 and at that time he will be allocated to room-2 as well. so finally room-2 is the room in which the max number of patients have entered.

 Complete Interview Experience Here
 https://leetcode.com/discuss/interview-experience/2072074/Google-or-Software-Engineer-L3-or-Banglore-or-May-2022-Reject

*/






const maxUsedRooms = (N, patients) => {
  const availableRooms = new PriorityQueue((a, b) => a.nextAvailableTime - b.nextAvailableTime || a.id - b.id);
  const busyRooms = new PriorityQueue((a, b) => a.nextAvailableTime - b.nextAvailableTime || a.id - b.id);
  const rooms = Array(N).fill(0);
  for (let i = 0; i < N; i++) {
    availableRooms.enqueue({ nextAvailableTime: 0, id: i });
  }
  for (let { start, duration } of patients) {
    while (busyRooms.size() && busyRooms.peek().nextAvailableTime <= start) {
      availableRooms.enqueue(busyRooms.dequeue());
    }
    const { nextAvailableTime, id } = availableRooms.dequeue() || busyRooms.dequeue();
    rooms[id]++;
    const newTime = Math.max(start, nextAvailableTime) + duration;
    busyRooms.enqueue({ nextAvailableTime: newTime, id})
  }
  let max = 0;
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[max] < rooms[i]) {
      max = i;
    }
  }
  console.log(rooms, busyRooms.heap);
  return max + 1;
}

//7 8 9 16
const patient = [{ start: 1, duration: 6 }, { start: 1, duration: 7 }, { start: 1, duration: 8 }, { start: 1, duration: 15 }, { start: 1, duration: 20 }, { start: 12, duration: 1 }];

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

//console.log(maxUsedRooms(3, patient));

