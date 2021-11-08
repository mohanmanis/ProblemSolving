/* 
Count of subsets with sum equal to X
Given an array arr[] of length N and an integer X, the task is to find the number of subsets with a sum equal to X.

Examples: 

Input: arr[] = {1, 2, 3, 3}, X = 6
Output: 3
All the possible subsets are {1, 2, 3},
{1, 2, 3} and {3, 3}

Input: arr[] = {1, 1, 1, 1}, X = 1
Output: 4





*/

const findCountOfEqualSubsets = (set, sum) => {
 const n = set.length;
 const dp = new Array(n + 1).fill(new Array(sum + 1));

 for (let i = 0; i <= sum; i++) {
  dp[0][i] = 0;
 }
 for (let i = 0; i < n; i++) {
  dp[i][0] = 1;
 }

 for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= sum; j++) {
   // let includingCurrentValue = 0;
   // let excludingCurrentValue = 0;
   if (set[i] <= j) {
    dp[i][j] = dp[i - 1][j] + dp[i - 1][j - set[i]]
   } else {
    dp[i][j] = dp[i - 1][j];
   }
   // excludingCurrentValue = dp[i - 1][j];
   // dp[i][j] = includingCurrentValue + excludingCurrentValue
  }
 }
 return dp[n][sum]
}


const arr = [3, 3, 3, 3];
const sum = 6;

console.log(findCountOfEqualSubsets(arr, sum))