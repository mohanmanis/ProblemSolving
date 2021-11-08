/* 
Palindrome Partitioning
Given a string, a partitioning of the string is a palindrome partitioning if every substring of the partition is a palindrome. For example, “aba|b|bbabb|a|b|aba” is a palindrome partitioning of “ababbbabbababa”. Determine the fewest cuts needed for a palindrome partitioning of a given string. For example, minimum of 3 cuts are needed for “ababbbabbababa”. The three cuts are “a|babbbab|b|ababa”. If a string is a palindrome, then minimum 0 cuts are needed. If a string of length n containing all different characters, then minimum n-1 cuts are needed.
*/


const palindromePartitioning = (str, i = 0, j = str.length - 1) => {
 if (i >= j || isPalindrome(str, i, j)) return 0; // since if i==j means array has one element and one element is not enough to provide the dimension of matrix
 // we will break it into two parts i =1 to k and k + 1 to j -1;
 let min = Infinity;

 for (let k = i; k <= j - 1; k++) {
  const temp = palindromePartitioning(str, i, k) + palindromePartitioning(str, k + 1, j) + 1;
  min = Math.min(min, temp)
 }
 return min;
}

const palindromePartitioningWithMemoization = (str, i = 0, j = str.length - 1) => {
 if (i >= j || isPalindrome(str, i, j)) return 0; // since if i==j means array has one element and one element is not enough to provide the dimension of matrix
 // we will break it into two parts i =1 to k and k + 1 to j -1;
 const dp = Array(j + 1).fill(0).map(x => Array(j + 1).fill(-1));
 if(dp[i][j] !== -1) return dp[i][j];
 let min = Infinity;

 for (let k = i; k <= j - 1; k++) {
  const temp = palindromePartitioning(str, i, k) + palindromePartitioning(str, k + 1, j) + 1;
  min = Math.min(min, temp)
 }
 return dp[i][j] = min;
}

const palindromePartitioningWithOptimization = (str, i = 0, j = str.length - 1) => {
 if (i >= j || isPalindrome(str, i, j)) return 0; // since if i==j means array has one element and one element is not enough to provide the dimension of matrix
 // we will break it into two parts i =1 to k and k + 1 to j -1;
 const dp = Array(j + 1).fill(0).map(x => Array(j + 1).fill(-1));
 if (dp[i][j] !== -1) return dp[i][j];
 let min = Infinity;

 for (let k = i; k <= j - 1; k++) {
  const left = dp[i][k] !== -1 ? dp[i][k] : palindromePartitioning(str, i, k);
  const right = dp[k + 1][j] !== -1 ? dp[k + 1][j] : palindromePartitioning(str, k + 1, j);
  min = Math.min(min, left + right + 1)
 }
 return dp[i][j] = min;
}

const isPalindrome = (s, left, right) => {
   while(left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
   }
   return true;
}

const str = "ababbbabbababa";
console.log(`Min cuts needed for Palindrome Partitioning is ${palindromePartitioning(str)}`);
console.log(`Min cuts needed for Palindrome Partitioning is ${palindromePartitioningWithMemoization(str)}`);
console.log(`Min cuts needed for Palindrome Partitioning is ${palindromePartitioningWithOptimization(str)}`);