/* 
Given a value N, if we want to make change for N cents, and we have infinite supply of each of S = { S1, S2, .. , Sm} valued coins, how many ways can we make the change? The order of coins doesn’t matter.
For example, for N = 4 and S = {1,2,3}, there are four solutions: {1,1,1,1},{1,1,2},{2,2},{1,3}. So output should be 4. For N = 10 and S = {2, 5, 3, 6}, there are five solutions: {2,2,2,2,2}, {2,2,3,3}, {2,2,6}, {2,3,5} and {5,5}. So the output should be 5.

1) Optimal Substructure
To count the total number of solutions, we can divide all set solutions into two sets.
1) Solutions that do not contain mth coin (or Sm).
2) Solutions that contain at least one Sm.
Let count(S[], m, n) be the function to count the number of solutions, then it can be written as sum of count(S[], m-1, n) and count(S[], m, n-Sm).
Therefore, the problem has optimal substructure property as the problem can be solved using solutions to subproblems.

2) Overlapping Subproblems
Following is a simple recursive implementation of the Coin Change problem. The implementation simply follows the recursive structure mentioned above.

*/

const unboundedKnapsack = (W, val, wt) => {
 // dp[i] is going to store maximum value
 // with knapsack capacity i.
 const n = val.length;
 const dp = new Array(W + 1).fill(0);

 // Fill dp[] using above recursive formula
 for (let i = 0; i <= W; i++) {
  for (let j = 0; j < n; j++) {
   if (wt[j] <= i) {
    dp[i] = Math.max(dp[i], dp[i - wt[j]] + val[j]);
   }
  }
 }
 return dp[W];

}

const coinChangeProblem = (coinArr, totalNumberCoinsToBeTaken) => {
 return unboundedKnapsack(totalNumberCoinsToBeTaken, coinArr, coinArr)
}
const coinArr = [1, 2, 3];
const totalNumberCoinsToBeTaken = 4;
console.log("Number of ways to get the change ::", coinChangeProblem(coinArr, totalNumberCoinsToBeTaken))