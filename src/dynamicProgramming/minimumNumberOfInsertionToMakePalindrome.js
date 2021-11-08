/* 
Minimum number of insertions to make a string palindrome
Given a string, find the minimum number of characters to be inserted to form Palindrome string out of given string

Examples:
ab: Number of insertions required is 1. bab
aa: Number of insertions required is 0. aa

This question is very similar to minimum number if deletion to make a string a palindrome.
number of deletion === number of insertion === string.length - LPS
ex:
aebcbda
either we delete e, and d ==> abcba
or we insert e and d to make their pair ==> adebcbeda
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

const minimumNumberOfInsertion = (str) => {
 const str2 = str.split("").reverse().join(""); // since we need to find the palindromic sequence so, we have the first string
 const longestPalindromicSequence = longestCommonSubsequence(str, str2);
 return str.length - longestPalindromicSequence;
}


console.log(`The minimum number if insertion to make "ab" a palindrome is ::${minimumNumberOfInsertion("ab")}`); //1

console.log(`The minimum number if insertion to make "aa" a palindrome is ::${minimumNumberOfInsertion("aa")}`);//0