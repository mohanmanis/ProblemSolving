/* 
Matrix Chain Multiplication
Given a sequence of matrices, find the most efficient way to multiply these matrices together. The problem is not actually to perform the multiplications, but merely to decide in which order to perform the multiplications.
We have many options to multiply a chain of matrices because matrix multiplication is associative. In other words, no matter how we parenthesize the product, the result will be the same. For example, if we had four matrices A, B, C, and D, we would have:

(ABC)D = (AB)(CD) = A(BCD) = ....

However, the order in which we parenthesize the product affects the number of simple arithmetic operations needed to compute the product, or the efficiency. For example, suppose A is a 10 × 30 matrix, B is a 30 × 5 matrix, and C is a 5 × 60 matrix. Then,

(AB)C = (10×30×5) + (10×5×60) = 1500 + 3000 = 4500 operations
A(BC) = (30×5×60) + (10×30×60) = 9000 + 18000 = 27000 operations.

*/

const mcmWithoutMemoization = (arr, i = 1, j = arr.length - 1) => {
 if (i >= j) return 0; // since if i==j means array has one element and one element is not enough to provide the dimension of matrix
 // we will break it into two parts i =1 to k and k + 1 to j -1;
 let min = Infinity;

 for (let k = i; k <= j - 1; k++) {
  const temp = mcmWithoutMemoization(arr, i, k) + mcmWithoutMemoization(arr, k + 1, j) + (arr[i - 1] * arr[k] * arr[j]);
  min = Math.min(min, temp)
 }
 return min;
}

const mcmWithMemoization = (arr, i = 1, j = arr.length - 1) => {
 if (i >= j) return 0; // since if i==j means array has one element and one element is not enough to provide the dimension of matrix
 // we will break it into two parts i =1 to k and k + 1 to j -1;
 const dp = Array(j + 1).fill(0).map(x => Array(j + 1).fill(-1));
 if (dp[i][j] != -1) {
  return dp[i][j];
 }
 dp[i][j] = Infinity;
 for (let k = i; k <= j - 1; k++) {
  const temp = mcmWithMemoization(arr, i, k) + mcmWithMemoization(arr, k + 1, j) + (arr[i - 1] * arr[k] * arr[j]);
  dp[i][j] = Math.min(dp[i][j], temp);
 }
 return dp[i][j];
}

const mcmWithTabulation = (arr, i = 1, j = arr.length - 1) => {
 if (i >= j) return 0; // since if i==j means array has one element and one element is not enough to provide the dimension of matrix
 // we will break it into two parts i =1 to k and k + 1 to j -1;
 const dp = Array(j + 1).fill(0).map(x => Array(j + 1).fill(-1));
 if (dp[i][j] != -1) {
  return dp[i][j];
 }
 dp[i][j] = Infinity;
 for (let k = i; k <= j - 1; k++) {
  const temp = mcmWithMemoization(arr, i, k) + mcmWithMemoization(arr, k + 1, j) + (arr[i - 1] * arr[k] * arr[j]);
  dp[i][j] = Math.min(dp[i][j], temp);
 }
 return dp[i][j];
}

const arr = [1, 2, 3, 4, 3]
console.log(`The minimum cost of mcm is :: ${mcmWithoutMemoization(arr)}`);
console.log(`The minimum cost of mcm is :: ${mcmWithMemoization(arr)}`);