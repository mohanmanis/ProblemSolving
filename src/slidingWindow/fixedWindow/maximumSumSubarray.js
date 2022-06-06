/* 
Find maximum (or minimum) sum of a subarray of size k
Given an array of integers and a number k, find the maximum sum of a subarray of size k. 

Input  : arr[] = {100, 200, 300, 400}
         k = 2
Output : 700

Input  : arr[] = {1, 4, 2, 10, 23, 3, 1, 0, 20}
         k = 4 
Output : 39
We get maximum sum by adding subarray {4, 2, 10, 23}
of size 4.

Input  : arr[] = {2, 3}
         k = 3
Output : Invalid
There is no subarray of size 3 as size of whole
array is 2. 

*/
const maximumSumSubarray = (arr, k) => {
  let maxValue = Number.MIN_VALUE;
  let currentRunningSum = 0;
  let i = 0, j = 0;
  while (i < arr.length) {
    currentRunningSum += arr[i];
    if (i - j + 1 === k) {  // ~== (i >= k - 1), if don't want to use j
      maxValue = Math.max(currentRunningSum, maxValue);
      currentRunningSum -= arr[j]; // [i - (k - 1)], if don't want to use j
      j++;
    }
    i++;
  }
  return maxValue;
}

const arr = [4, 2, 1, 7, 8, 1, 2, 8, 1, 0]
const k = 3
console.log(`The maximum Sum of contagious sub-array  of size ${k} and array ${arr} is : ${maximumSumSubarray(arr, k)}`);