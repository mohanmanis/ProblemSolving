/* 
Count no of subsets with given difference (DP)
Let sum of subset 1 be s1 and subset 2 with s2
s1 - s2 = diff (given)
s1 + s2 = sum of array (logical)
Therefore adding both eq we get :
2s1= diff + sum of array
s1= (diff + sum of array)/2;
Problem reduces to find no of subsets with given sum**
*/

/*
 It is same as subset with given difference.Please use
 that for the solution

 */
const findCountOfSubsetsWithGivenDiff = function (arr, diff) {
 diff = Math.abs(diff)
 let sum = arr.reduce((a, b) => a + b, 0)
 let target = (diff + sum) / 2

 if (diff > sum || (sum + diff) % 2 == 1) return 0

 let r = arr.length
 let c = target

 let dp = new Array(r + 1).fill(0).map(() => new Array(c + 1).fill(0))

 for (let i = 0; i < dp.length; i++) dp[i][0] = 1

 for (let i = 1; i <= r; i++) {
  for (let j = 1; j <= c; j++) {
   if (arr[i - 1] <= j) {
    dp[i][j] = dp[i - 1][j] + dp[i - 1][j - arr[i - 1]]
   } else {
    dp[i][j] = dp[i - 1][j]
   }
  }
 }
 return dp[r][c]
};

const arr = [1, 1, 2, 3]
const diff = 1;
console.log(findCountOfSubsetsWithGivenDiff(arr, diff))