/* 
Given a rod of length n inches and an array of prices that includes prices of all pieces of size smaller than n. Determine the maximum value obtainable by cutting up the rod and selling the pieces. For example, if the length of the rod is 8 and the values of different pieces are given as the following, then the maximum obtainable value is 22 (by cutting in two pieces of lengths 2 and 6)

length   | 1   2   3   4   5   6   7   8
--------------------------------------------
price    | 1   5   8   9  10  17  17  20
And if the prices are as following, then the maximum obtainable value is 24 (by cutting in eight pieces of length 1)

length   | 1   2   3   4   5   6   7   8
--------------------------------------------
price    | 3   5   8   9  10  17  17  20

A naive solution to this problem is to generate all configurations of different pieces and find the highest-priced configuration. This solution is exponential in terms of time complexity. Let us see how this problem possesses both important properties of a Dynamic Programming (DP) Problem and can efficiently be solved using Dynamic Programming.
1) Optimal Substructure:
We can get the best price by making a cut at different positions and comparing the values obtained after a cut. We can recursively call the same function for a piece obtained after a cut.
Let cutRod(n) be the required (best possible price) value for a rod of length n. cutRod(n) can be written as follows.
cutRod(n) = max(price[i] + cutRod(n-i-1)) for all i in {0, 1 .. n-1}

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

const rodCuttingProblem = (priceArr) => {
 const lengthOfRod = priceArr.length;
 const lengthArr = new Array(lengthOfRod).fill(0).map((_, i) => i + 1);
 return unboundedKnapsack(lengthOfRod, priceArr, lengthArr)
}
const priceArr = [1, 5, 8, 9, 10, 17, 17, 20]
console.log("Maximum value obtainable by cutting up the rod and selling the pieces is ::", rodCuttingProblem(priceArr))