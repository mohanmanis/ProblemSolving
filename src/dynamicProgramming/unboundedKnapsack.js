/* 
Given a knapsack weight W and a set of n items with certain value val and weight wt, we need to calculate the maximum amount that could make up this quantity exactly. This is different from classical Knapsack problem, here we are allowed to use unlimited number of instances of an item.
Examples:

Input : W = 100
       val[]  = {1, 30}
       wt[] = {1, 50}
Output : 100
There are many ways to fill knapsack.
1) 2 instances of 50 unit weight item.
2) 100 instances of 1 unit weight item.
3) 1 instance of 50 unit weight item and 50
   instances of 1 unit weight items.
We get maximum value with option 2.

Input : W = 8
       val[] = {10, 40, 50, 70}
       wt[]  = {1, 3, 4, 5}
Output : 110
We get maximum value with one unit of
weight 5 and one unit of weight 3.

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

const W = 100;
const val = [10, 30, 20];
const wt = [5, 10, 15];
console.log(unboundedKnapsack(W, val, wt));