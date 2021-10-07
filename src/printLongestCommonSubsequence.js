/* 
Longest Common Subsequence Problem solution using recursion
Given two sequences, find the length of longest subsequence present in both of them.
A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous.

For example, "abc",  "abg", "bdf", "aeg",  "acefg", .. etc are subsequences of "abcdefg".

Examples:
LCS for input Sequences "ABCDGH" and "AEDFHR" is "ADH" of length 3.
LCS for input Sequences "AGGTAB" and "GXTXAYB" is "GTAB" of length 4.

*/


const printLongestCommonSubsequence = (text1, text2) => {
 const m = text1.length;
 const n = text2.length;
 let result = "";
 const dp = [...Array(m + 1)].map(() => Array(n + 1).fill(0));
 for (let i = 1; i < m + 1; i++) {
  for (let j = 1; j < n + 1; j++) {
   if (text1[i - 1] === text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1; // We have a match, increment with the top left.
   else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // No match, use the max of left or top.
  }
 }
 // for printing longest common subsequence
  let i = m, j = n;
 while (i > 0 && j > 0) {    // if any of this i and j becomes 0 means one string is empty 
  if (text1[i - 1] == text2[j - 1]) {
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


console.log(`The Longest common subsequence of ABCDGH and AEDFHR ${printLongestCommonSubsequence("ABCDGH", "AEDFHR")}`);

console.log(`The Longest common subsequence of AGGTAB and GXTXAYB ${printLongestCommonSubsequence("AGGTAB", "GXTXAYB")}`)