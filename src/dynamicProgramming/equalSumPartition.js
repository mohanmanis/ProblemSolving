/* Partition problem is to determine whether a given set can be partitioned into two subsets such that the sum of elements in both subsets is the same. 
arr[] = {1, 5, 11, 5}
Output: true

The array can be partitioned as {1, 5, 5} and {11}

arr[] = {1, 5, 3}
Output: false
The array cannot be partitioned into equal sum sets.

Following are the two main steps to solve this problem:
1) Calculate sum of the array. If sum is odd, there can not be two subsets with equal sum, so return false.
2) If sum of array elements is even, calculate sum/2 and find a subset of array with sum equal to sum/2.
The first step is simple. The second step is crucial, it can be solved either using recursion or Dynamic Programming.

Recursive Solution
Following is the recursive property of the second step mentioned above.

Let isSubsetSum(arr, n, sum/2) be the function that returns true if
there is a subset of arr[0..n-1] with sum equal to sum/2

The isSubsetSum problem can be divided into two subproblem
 a) isSubsetSum() without considering last element
    (reducing n to n-1)
 b) isSubsetSum considering the last element
    (reducing sum/2 by arr[n-1] and n to n-1)
If any of the above subproblem return true, then return true.
isSubsetSum (arr, n, sum/2) = isSubsetSum (arr, n-1, sum/2) ||
                              isSubsetSum (arr, n-1, sum/2 - arr[n-1])

 Time Complexity: O(2^n) In the worst case, this solution tries two possibilities (whether to include or exclude) for every element.

The problem can be solved using dynamic programming when the sum of the elements is not too big. We can create a 2D array part[][] of size (sum/2 + 1)*(n+1). And we can construct the solution in a bottom-up manner such that every filled entry has the following property

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
            dp[i][j] = dp[i][j - set[i - 1]] || dp[i][j]
         } else {
            dp[i][j] = dp[i - 1][j]
         }
      }
   }
   return dp[n][sum]
}

const isEqualSumPartition = (arr) => {
   const sum = arr.reduce((sum, currentValue) => sum + currentValue, 0);
   return sum % 2 === 0 ? isSubsetSum2(arr, sum / 2) : false;
}


const arr = [3, 1, 5, 9, 12]
console.log(isEqualSumPartition(arr))