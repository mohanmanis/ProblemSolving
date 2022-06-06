/* 
Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray [numsl, numsl+1, ..., numsr-1, numsr] of which the sum is greater than or equal to target. If there is no such subarray, return 0 instead. 

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.

Input: target = 4, nums = [1,4,4]
Output: 1

Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0

*/
const smallestSubarrayWithGivenSum = (nums, target) => {
 let minWindowSize = Number.MAX_VALUE;
 let currentWindowSum = 0;
 let windowStart = 0, windowEnd = 0;
 while (windowEnd < nums.length) {
  currentWindowSum += nums[windowEnd];
  while (currentWindowSum >= target) {
   minWindowSize = Math.min(minWindowSize, windowEnd - windowStart + 1);
   currentWindowSum -= nums[windowStart++];
  }
  windowEnd++
 }
 return minWindowSize != Number.MAX_VALUE ? minWindowSize : 0;
}

const arr = [4, 2, 2, 7, 8, 1, 2, 8, 10]
const target = 8
console.log(`The smallest subarray of with targetSum of ${target} inside array ${arr} is : ${smallestSubarrayWithGivenSum(arr, target)}`);