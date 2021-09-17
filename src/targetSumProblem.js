/* 
Target Sum Problem
Given a list of non-negative integers, a1, a2, ..., an, and a target, S. Now you have 2 symbols + and -. For each integer, you should choose one from + and - as its new symbol.

Find out how many ways to assign symbols to make sum of integers equal to target S.

Example 1:
Input: nums is [1, 1, 1, 1, 1], S is 3.
Output: 5
Explanation:

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

There are 5 ways to assign symbols to make the sum of nums be target 3.

ou are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.


*/






const findTargetSumWays = function (nums, S) {
 /* 
 It is same as subset with given difference.Please use 
 that for the solution
 
 */
 S = Math.abs(S)
 let sum = nums.reduce((a, b) => a + b, 0)

 let target = (S + sum) / 2

 if (S > sum || (sum + S) % 2 == 1) return 0

 let r = nums.length
 let c = target

 let dp = new Array(r + 1).fill(0).map(() => new Array(c + 1).fill(0))

 for (let i = 0; i < dp.length; i++) dp[i][0] = 1

 for (let i = 1; i <= r; i++) {
  for (let j = 1; j <= c; j++) {
   if (nums[i - 1] <= j) {
    dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i - 1]]
   } else {
    dp[i][j] = dp[i - 1][j]
   }
  }
 }
 return dp[r][c]
};

const arr = [1, 1, 1, 1, 1];
const sum = 3;
console.log(`No of ways to reach the target Sum: ${findTargetSumWays(arr, sum)}`)