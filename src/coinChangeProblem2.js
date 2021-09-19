/* 
Find minimum number of coins that make a given value
Given a value V, if we want to make change for V cents, and we have infinite supply of each of C = { C1, C2, .. , Cm} valued coins, what is the minimum number of coins to make the change? If it’s not possible to make change, print -1.

Input: coins[] = {25, 10, 5}, V = 30
Output: Minimum 2 coins required
We can use one coin of 25 cents and one of 5 cents

Input: coins[] = {9, 6, 5, 1}, V = 11
Output: Minimum 2 coins required
We can use one coin of 6 cents and 1 coin of 5 cents

It is a variation of unbounded knapsack.
*/
const coinChange = (coins, amount) => {
 coins = coins.sort((a, b) => a - b)
 const dp = new Array(amount + 1).fill(amount + 1) //  Filling Amount + 1 as in this case that would be maximum possible value, no     need to have infinity
 dp[0] = 0;
 for (let i = 0; i < amount + 1; i++) {
  for (let j = 0; j < coins.length; j++) {
   if (coins[j] <= i) {
    dp[i] = Math.min(dp[i], 1 + dp[i - coins[j]])
   } else {
    break;
   }
  }
 }
 return dp[amount] > amount ? -1 : dp[amount];
}

const coinChangeOptimized =  (coins, amount) =>  {
 const n = amount;
 //Initialize array from [0 -> n + 1] filled with Infinity
 //Then set 0 index to = 0, this is the 'base case' that our loop looks for.const n = cpins.length;
 const numCoins = Array(n + 1).fill(Infinity);
 numCoins[0] = 0;

 //Loop over each coin, then loop over our numCoins array starting at value of coin. 
 //5$ coin can't help us if we're looking for answer = 4.  Then we increment and build up 
 //our numCoins array for each denomination.
 coins.forEach(coin => {
  for (let curTotal = coin; curTotal <= n; curTotal++) {
   numCoins[curTotal] = Math.min(numCoins[curTotal], numCoins[curTotal - coin] + 1);
  }
 })

 //Val stored at arr[n] is now the minumum number of coins to reach total = n.
 return numCoins[n] === Infinity ? -1 : numCoins[n]
};


const coinsArray = [9, 6, 5, 1];
const amount = 11;
console.log(`The minimum number coins to get the amount is :: ${coinChange(coinsArray, amount)}`)
console.log(`The minimum number coins from optimized way to get the amount is :: ${coinChangeOptimized(coinsArray, amount)}`)