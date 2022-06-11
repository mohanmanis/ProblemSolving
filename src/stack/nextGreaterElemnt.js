/*
Given an integer array, find the next greater element for every array element. The next greater element of a number x is the first greater number to the right of x in the array.

In other words, for each element A[i] in the array A, find an element A[j] such that j > i and A[j] > A[i] and the value of j should be as minimum as possible. If the next greater element doesn’t exist in the array for any element, consider it -1.

Input:  [2, 7, 3, 5, 4, 6, 8]
Output: [7, 8, 5, 6, 6, 8, -1]

Input:  [5, 4, 3, 2, 1]
Output: [-1, -1, -1, -1, -1


  Algorithm:
  Smaller or Equal elements can be pushed over to top of the stack
*/


const nextGreaterElement = (input) => {
  if (!input.length) return input;
  const result = Array(input.length).fill(-1);
  let stack = [];
  for (let i = 0; i < input.length; i++) {
    // greater elements should be popped out
    while (stack.length && input[stack[stack.length - 1]] < input[i]) { //stack[stack.length - 1, it gives stack top, which is a index and that is why we have to look up inside the input array for the value
      result[stack.pop()] = input[i];
    }
    stack.push(i); // we are storing the indexes rather than elements
  }
  return result;
}

const arr = [2, 7, 3, 5, 4, 6, 8]
console.log(`The Next greater Elements of every elements inside array ${arr} is : ${nextGreaterElement(arr)}`);