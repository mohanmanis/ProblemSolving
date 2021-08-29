/* Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack.In other words, given two integer arrays val[0..n - 1] and wt[0..n - 1] which represent values and weights associated with n items respectively.Also given an integer W which represents knapsack capacity, find out the maximum value subset of val[] such that sum of the weights of this subset is smaller than or equal to W.You cannot break an item, either pick the complete item or don’t pick it(0 - 1 property). 
Example:
value = [60, 100, 120];
weight = [10, 20, 30]
W = 50

Weight = 10; Value:60;
Weight = 20; Value:100;
Weight = 30; Value:120;
Weight = (20 + 10); Value = (100 + 60);
Weight = (30 + 10); Value = (120 + 60);
Weight = (30 + 20); Value = (120 + 100);
Weight = (30 + 20 + 10) > 50;

solution: 220
*/

/* A Naive recursive implementation of
 0-1 Knapsack problem 

Complexity Analysis:

Time Complexity: O(2n).
As there are redundant subproblems.
Auxiliary Space :O(1).
As no extra data structure has been used for storing values.
 
 */

const knapSack1 = (W, wt, val, n = val.length) => {

  // Base Condition
  if (n == 0 || W == 0) {
    return 0;
  }

  // If weight of the nth item is
  // more than Knapsack capacity W,
  // then this item cannot be
  // included in the optimal solution

  if (wt[n - 1] > W) {
    return knapSack1(W, wt, val, n - 1);
  }

  // Return the maximum of two cases:
  // (1) nth item included
  // (2) not included
  else {
    return Math.max(val[n - 1] +
      knapSack1(W - wt[n - 1], wt, val, n - 1),
      knapSack1(W, wt, val, n - 1));
  }
}

/* Method 2: This method uses Memoization Technique (an extension of recursive approach).
This method is basically an extension to the recursive approach so that we can overcome the problem of calculating redundant cases and thus increased complexity.We can solve this problem by simply creating a 2 - D array that can store a particular state(n, w) if we get it the first time.Now if we come across the same state(n, w) again instead of calculating it in exponential complexity we can directly return its result stored in the table in constant time.This method gives an edge over the recursive approach in this aspect. 

Complexity Analysis:

Time Complexity: O(N*W).
As redundant calculations of states are avoided.
Auxiliary Space: O(N*W).
The use of 2D array data structure for storing intermediate states-:

*/

const knapSack2 = (W, wt, val, n = val.length, dp) => {
  if (!dp) {
    dp = new Array(n + 1).fill(new Array(W + 1).fill(-1))
  }
  // Base condition
  if (n == 0 || W == 0) {
    return 0;
  }
  if (dp[n][W] !== -1) {
    return dp[n][W];
  }

  if (wt[n - 1] > W) {
    // Store the value of function call
    // stack in table before return
    return dp[n][W] = knapSack2(W, wt, val,
      n - 1, dp);
  } else {
    // Return value of table after storing
    return dp[n][W] = Math.max((val[n - 1] +
      knapSack2(W - wt[n - 1], wt,
        val, n - 1, dp)),
      knapSack2(W, wt, val,
        n - 1, dp));
  }

}

/* 
Method 3 :-  We use the dynamic programming approach but without using recursion but using the 
iteration .

Complexity Analysis:

Time Complexity: O(N*W). As redundant calculations of states are avoided.

Auxiliary Space: O(N*W) 
The use of 2D array data structure for storing intermediate states-:

*/
const knapSack3 = (W, wt, val) => {
  const n = val.length;
  const dp = new Array(n + 1).fill(new Array(W + 1).fill(0));
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < W + 1; j++) {
      if (wt[i] <= j) {
        dp[i][j] = Math.max(val[i] + dp[i][j - wt[i]], dp[i][j])
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }
  return dp[n][W]
}


/*
Method 4 :-  We use the dynamic programming approach but with optimized
space complexity .

Complexity Analysis:

Time Complexity: O(N*W). As redundant calculations of states are avoided.

Auxiliary Space: O(W) As we are using 1-D array instead of 2-D array.

*/
const knapSack4 = (W, wt, val) => {
  const n = val.length;
  const dp = new Array(W + 1).fill(0);
  for (let i = 0; i < n + 1; i++) {
    for (let j = W + 1; j > 0; j--) {
      if (wt[i - 1] <= j) {
        dp[j] = Math.max(dp[j], dp[j - wt[i - 1]] + val[i - 1])
      }
    }
  }
  return dp[W]
}
const val = [60, 100, 120];
const wt = [10, 20, 30];

const W = 50;

console.log(knapSack1(W, wt, val))
console.log(knapSack2(W, wt, val))
console.log(knapSack3(W, wt, val))
console.log(knapSack4(W, wt, val))