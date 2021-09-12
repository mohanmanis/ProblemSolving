/* 
Count no of subsets with given difference (DP)
Let sum of subset 1 be s1 and subset 2 with s2
s1 - s2 = diff (given)
s1 + s2=sum of array (logical)
Therefore adding both eq we get :
2s1= diff + sum of array
s1= (diff + sum of array)/2;
Problem reduces to find no of subsets with given sum**
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



const countWithGivenDiff = (arr, diff) => {
 const sum = arr.reduce((sum, currentValue) => sum += currentValue, 0)
 const reqSum = (diff + sum) / 2;
 return findCountOfEqualSubsets(arr, reqSum);
}
const arr = [1, 1, 2, 3]
const diff = 1;
console.log(countWithGivenDiff(arr, diff))