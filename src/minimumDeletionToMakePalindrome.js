/* 
Minimum number of deletions to make a string palindrome
Given a string of size ‘n’. The task is to remove or delete the minimum number of characters from the string so that the resultant string is a palindrome.

Input : aebcbda
Output : 2
Remove characters 'e' and 'd'
Resultant string will be 'abcba'
which is a palindromic string

Input : geeksforgeeks
Output : 8
*/


const longestCommonSubsequence = (text1, text2) => {
 const m = text1.length;
 const n = text2.length;
 const dp = [...Array(m + 1)].map(() => Array(n + 1).fill(0));
 for (let i = 1; i < m + 1; i++) {
  for (let j = 1; j < n + 1; j++) {
   if (text1[i - 1] === text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1; // We have a match, increment with the top left.
   else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // No match, use the max of left or top.
  }
 }
 return dp[m][n]; // Return the bottom right value

};

const minimumDeletions = (str) => {
 const str2 = str.split("").reverse().join(""); // since we need to find the palindromic sequence so, we have the first string
 const longestPalindromicSequence = longestCommonSubsequence(str, str2);
 return str.length - longestPalindromicSequence;
}

/* Input: aebcbda
Output: 2
Remove characters 'e' and 'd'
Resultant string will be 'abcba'
which is a palindromic string */
console.log(`The Longest common subsequence of aebcbda ${minimumDeletions("aebcbda")}`);


