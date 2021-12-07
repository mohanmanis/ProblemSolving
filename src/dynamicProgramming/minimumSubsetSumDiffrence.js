/* 
Partition a set into two subsets such that the difference of subset sums is minimum

Given a set of integers, the task is to divide it into two sets S1 and S2 such that the absolute difference between their sums is minimum.
If there is a set S with n elements, then if we assume Subset1 has m elements, Subset2 must have n-m elements and the value of abs(sum(Subset1) – sum(Subset2)) should be minimum.
Example:

Input:  arr[] = {1, 6, 11, 5}
Output: 1
Explanation:
Subset1 = {1, 5, 6}, sum of Subset1 = 12
Subset2 = {11}, sum of Subset2 = 11
*/

const subsetSum = (set, sum) => {
 const n = set.length;
 const dp = new Array(n + 1).fill(new Array((sum + 1) / 2)); // only half is needed
 for (let i = 0; i < n + 1; i++) {
  for (let j = 0; j < (sum + 1) / 2; j++) {
   if (i === 0) {
    dp[i][j] = false;
   } else if (j === 0) {
    dp[i][j] = true;
   } else if (set[i - 1] <= j) {
    dp[i][j] = dp[i][j - set[i - 1]] || dp[i][j]
   } else {
    dp[i][j] = dp[i - 1][j]
   }
  }
 }
 return dp;
}

const minSubsetSumDiff = (arr) => {
 const sum = arr.reduce((sum, current) => sum += current, 0);
 const dp = subsetSum(arr, sum)[arr.length]
 let minDiff = Number.POSITIVE_INFINITY;
 for (let i = 0; i < dp.length; i++) {
  if (dp[i]) {
   minDiff = Math.min(minDiff, sum - 2 * i)
  }
 }
 return minDiff
}

const arr = [1, 6, 11, 5];
console.log(`The Minimum difference of 2 sets is: ${minSubsetSumDiff(arr)}`)