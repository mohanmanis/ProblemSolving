/* 
Print Longest Repeating subsequence
Given a string, print the longest repeating subsequence such that the two subsequence don’t have same string character at same position, i.e., any i’th character in the two subsequences shouldn’t have the same index in the original string.

*/

const printLongestRepeatingSubsequence = (text1) => {
 const m = text1.length;
 const n = text1.length;
 let result = "";
 const dp = [...Array(m + 1)].map(() => Array(n + 1).fill(0));
 for (let i = 1; i < m + 1; i++) {
  for (let j = 1; j < n + 1; j++) {
   if (text1[i - 1] === text1[j - 1] && i !== j) dp[i][j] = dp[i - 1][j - 1] + 1; // We have a match, increment with the top left.
   else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // No match, use the max of left or top.
  }
 }
 // for printing longest repeating subsequence
 let i = m, j = n;
 while (i > 0 && j > 0) {    // if any of this i and j becomes 0 means one string is empty 
  if (text1[i - 1] == text1[j - 1] && i !== j) {
   result += text1[i - 1];    //if character matches then add that to result string and move diagonally up
   i--; j--;
  }
  else {
   if (dp[i][j - 1] > dp[i - 1][j]) j--;    // else find the max of up and right position of dp table and move accordingly to up or left
   else i--;
  }
 }
 return result.split("").reverse().join(""); // reverse the string as we started from last

};


console.log(`The Longest repeating subsequence of AABEBCDD ${printLongestRepeatingSubsequence("AABEBCDD")}`); //ABD

console.log(`The Longest repeating subsequence of aab ${printLongestRepeatingSubsequence("aab")}`);//a