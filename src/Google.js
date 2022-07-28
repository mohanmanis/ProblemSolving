/* 


https://leetcode.com/discuss/interview-question/2337863/Google-or-Onsite-or-My-Calendar-I
https://leetcode.com/discuss/interview-question/2337836/Google-or-Onsite-or-Find-Group-of-3-Numbers-Within-a-Distance-'d
https://leetcode.com/discuss/interview-question/2337763/Google-or-Phone-Screening-or-Tiling-Problem


Problem Statement:
Given a playlist of songs, you have to design a song shuffler.
This song shuffler is not like the normal song shuffler that shuffles the complete playlist at the start and returns a shuffled list, but instead when asked for a next song to be played, returns a random song from the list of songs.
The next random song to be played should satisfy a condition that the song was not played in the last 'k' turns.
You have to make sure, that at each call, all the eligible (not played during last k turns) songs have equal probability of being played next.

For example:
if songs = [A, B, C, D], k = 2,
then a possible random sequence of songs can be:

playNext: [ A , B , C , D ] ->  return C
playNext: [ A , B , _ , D ] ->  return A
playNext: [ _ , B , _ , D ] ->  return B
playNext: [ _ , _ , C , D ] ->  return C (as C was not played in the last two turns, it has an equal probability with D to be played).



Solution we finally came to after discussion:

Use Queue to track last k songs played.
Use ArrayList to store songs (not played in last k turns).
Use Java Random class to get a random number (upperBound being array size),
Pick the song at that index in array (to return as method output and push at the end of Queue),
Then fill that gap (random index) with the song at the last index in the array. Then remove the song at last index. (As this won't change the randomness, and will guarantee equal probability for each song)
If Queue length was > k, remove first song and add at the end of array.
Time Complexity = O(1)
Space Complexity = O(n) at max
where n is number of songs, k is queue size

Clarifying questions I asked:

Songs datatype? -> decided to be String
Can k = 0 be possible? -> Yes
Can n = 0 be possible? -> No, n >= 1
What will happen when k >= n? -> Considered this as an invalid case, i.e., k will always be < n.


*/


/* 
https://leetcode.com/discuss/interview-question/2072005/Google-or-Phone-Screening-or-Google-Photos-Client




Similar to https://leetcode.com/problems/design-an-ordered-stream/submissions/   

just return the >> this.pointer and no need create chunk.
*/


/* 
// o o c c o c 
// c c *
// o o o   * o
// c c c * c c
// o o o o o o    


const house = ["open", "open", "close", "close", "open", "close", "close", "close"]

class House {
  constructor(houses) {
    this.houses = houses;
    this.position = 0;
    this.size = this.houses.length;
  }
  openDoor() {
    this.houses[this.position] = "open"
  }

  closeDoor() {
    this.houses[this.position] = "close"
  }
  isDoorOpen() {
    return this.houses[this.position] === "open"
  }
  moveRight() {
    this.position = ++this.position % this.size;
  }
  moveLeft() {
    this.position = (--this.position + this.size) % this.size;
  }
  showHouses() {
    return this.houses;
  }
}


const countHouses = (houses) => {
  let house = new House(houses);
  while (true) {
    let forward = 0, backward = 0;
    while (house.isDoorOpen()) {
      house.closeDoor();
      house.moveRight();
      forward++;
    }
    while (!house.isDoorOpen()) {
      house.openDoor();
      house.moveLeft();
      backward++;
    }
    console.log(house.showHouses());
    if (forward === backward) return forward
  }

}


console.log(countHouses(house));



*/




/* 

 To be done -- https://leetcode.com/discuss/interview-question/2235988/Google-or-Onsite-or-How-to-solve-this/

*/

/* 
https://leetcode.com/discuss/interview-question/2316407/Google-or-Phone-screen-or-L3-or-Reject
https://leetcode.com/discuss/interview-question/2337836/Google-or-Onsite-or-Find-Group-of-3-Numbers-Within-a-Distance-'d'
*/
const findLowerBound = (numbers, target) => {
  let start = 0, end = numbers.length - 1, ans = -1;

  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2)
    if (numbers[mid] >= target) {
      end = mid - 1;
      ans = mid;
    }
    else {
      start = mid + 1;
    }
  }
  return ans;
}

// Return the number of triplet indices satisfies
// the three constraints
const findTriplet = (arr, k, result) => {
  // sort the array
  arr.sort((a, b) => a - b)

  // for each element from index 2 to n - 1.
  for (let i = 2; i < arr.length; i++) {

    // finding the lower bound of arr[i] - k.
    let cur = findLowerBound(arr, arr[i] - k);

    // If there are at least two elements between
    // lower bound and current element.
    if (cur <= i - 2) {

      // increment the count by lb - i C 2.
      result.push(arr.splice(i - 2, 3));
    }
  }
}



const traverseNumbers = (numbers, k) => {
  let temp = [], result = [];
  for (let number of numbers) {
    temp.push(number);
    if (temp.length > 2) {
      findTriplet(temp, k, result)
    }
  }
  return result;
}
let numbers = [25, 46, 31, 23, 45, 47, 50, 90, 99, 60, 70, 100, 66, -1, 3, -4];
console.log(traverseNumbers(numbers, k = 10))


var MyCalendar = function () {
  this.root = null;
};

/** 
 * @param {number} start 
 * @param {number} end
 * @return {boolean}
 */

function Node(start, end) {
  this.start = start;
  this.end = end;
  this.left = null;
  this.right = null;
}

MyCalendar.prototype.book = function (start, end) {
  if (!this.root) {
    return this.root = new Node(start, end);
  } else {
    let rec = (start, end, root) => {
      if (root.end <= start) {
        if (root.right) return rec(start, end, root.right);
        else {
          root.right = new Node(start, end);
          return true;
        }
      } else if (root.start >= end) {
        if (root.left) return rec(start, end, root.left);
        else {
          root.left = new Node(start, end);
          return true;
        }
      } else {
        return false;
      }
    }
    return rec(start, end, this.root);
  }
};

var MyCalendar = function () {
  //this.calender = {}; //if we are using map, this is O(N)
  this.events = []; // if using the sorted array O(N)
  //this.calender = [] // Nlog(N)
};

/** 
 * @param {number} start 
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.bookUsingBS = function (start1, end1) {
  let left = 0, right = this.calender.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const [start2, end2] = this.calender[mid];
    if (start1 < end2 && start2 < end1) return false;
    if (start1 >= end2) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  // The splice makes it O(n)
  this.calender.splice(left, 0, [start1, end1])
  return true
}


var cleanRoom = function (robot) {
  const visited = new Set();

  const goBack = () => {
    robot.turnRight();
    robot.turnRight();
    robot.move();
    robot.turnRight();
    robot.turnRight();
  }
  const backTracking = (row, col, direction) => {
    visited.add(`${row}${col}`);
    robot.clean();
    let [dr, dc] = [0, 1];

    for (let i = 0; i < 4; i++) {
      const newDirection = (direction + i) % 4;
      let newRow = dr + row;
      let newCol = dc + col;
      [dr, dc] = [dc, -dr];
      if (!visited.has(`${newRow}${newCol}`) && robot.move()) {
        backTracking(newRow, newCol, newDirection);
        goback();
      }
      // turn the robot following chosen direction : clockwise
      robot.turnRight();
    }
  }
  backTracking(0, 0, 0);
};



