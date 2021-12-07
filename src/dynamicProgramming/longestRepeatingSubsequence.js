/* 
Longest repeating subsequence
Longest Repeating Subsequence
Given a string, print the longest repeating subsequence such that the two subsequence don’t have same string character at same position, i.e., any i’th character in the two subsequences shouldn’t have the same index in the original string.
Example:
Input: str = "aab"
Output: "a"
The two subsequence are 'a'(first) and 'a'
(second). Note that 'b' cannot be considered
as part of subsequence as it would be at same
index in both.

*/

/* 
This problem is just the modification of Longest Common Subsequence problem. The idea is to find the LCS(str, str) where str is the input string with the restriction that when both the characters are same, they shouldn’t be on the same index in the two strings.
*/


const longestRepeatingSubsequence = (text1) => {
 const m = text1.length;
 const n = text1.length;
 const dp = [...Array(m + 1)].map(() => Array(n + 1).fill(0));
 for (let i = 1; i < m + 1; i++) {
  for (let j = 1; j < n + 1; j++) {
   if (text1[i - 1] === text1[j - 1] && i != j) dp[i][j] = dp[i - 1][j - 1] + 1; // We have a match, increment with the top left.
   else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // No match, use the max of left or top.
  }
 }
 return dp[m][n]; // Return the bottom right value

};


console.log(`The length of Longest repeating subsequence of AABEBCDD ${longestRepeatingSubsequence("AABEBCDD")}`);//ABD -> 3 

console.log(`The length of Longest repeating subsequence of aab ${longestRepeatingSubsequence("aab")}`);//a -> 1