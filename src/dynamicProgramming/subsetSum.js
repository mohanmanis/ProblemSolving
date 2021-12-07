/* 
Given a set of non-negative integers, and a value sum, determine if there is a subset of the given set with sum equal to given sum.

Example:

Input: set[] = {3, 34, 4, 12, 5, 2}, sum = 9
Output: True
There is a subset (4, 5) with sum 9.

Input: set[] = {3, 34, 4, 12, 5, 2}, sum = 30
Output: False
There is no subset that add up to 30.

Method 1: Recursion.
Approach: For the recursive approach we will consider two cases.

Consider the last element and now the required sum = target sum – value of ‘last’ element and number of elements = total elements – 1
Leave the ‘last’ element and now the required sum = target sum and number of elements = total elements – 1
Following is the recursive formula for isSubsetSum() problem.

isSubsetSum(set, n, sum)
= isSubsetSum(set, n-1, sum) ||
  isSubsetSum(set, n-1, sum-set[n-1])
Base Cases:
isSubsetSum(set, n, sum) = false, if sum > 0 and n == 0
isSubsetSum(set, n, sum) = true, if sum == 0

Complexity Analysis: The above solution may try all subsets of given set in worst case. Therefore time complexity of the above solution is exponential. The problem is in-fact NP-Complete (There is no known polynomial time solution for this problem).

*/

const isSubsetSum1 = (set, sum, n = set.length) => {
  // Base Cases
  if (sum == 0) {
    return true;
  }
  if (n == 0) {
    return false;
  }

  // If last element is greater than sum,
  // then ignore it
  if (set[n - 1] > sum)
    return isSubsetSum1(set, sum, n - 1);

  /* else, check if sum can be obtained
  by any of the following
  (a) including the last element
  (b) excluding the last element */
  return isSubsetSum1(set, sum, n - 1)
    || isSubsetSum1(set, sum - set[n - 1], n - 1);
}

/* 
Memoization Technique for finding Subset Sum:
Method:

In this method, we also follow the recursive approach but In this method, we use  2-D matrix in  we first initialize with -1 or any negative value.
In this method, we avoid the few of the recursive call which is repeated itself that’s why we use 2-D matrix. In this matrix we store the value of the previous call value.



*/

 const isSubsetSum2 = (set, sum) => {
  const n = set.length;
  const dp = new Array(n + 1).fill(new Array(sum + 1));
  for (let i = 0; i < n + 1; i++) {
    for (let j = 0; j < sum + 1; j++) {
      if (i === 0) {
        dp[i][j] = false;
      } else if (j === 0) {
        dp[i][j] = true;
      } else if (set[i - 1] <= j) {
        dp[i][j] = dp[i - 1][j - set[i - 1]] || dp[i][j]
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }
  return dp[n][sum]
}

const set = [3, 34, 4, 12, 5, 2];
const sum = 9;
console.log(isSubsetSum1(set, sum))
console.log(isSubsetSum2(set, sum))