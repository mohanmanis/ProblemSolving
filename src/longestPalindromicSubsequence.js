/* 
Given a sequence, find the length of the longest palindromic subsequence in it.
As  example, if the given sequence is “BBABCBCAB”, then the output should be 7 as “BABCBAB” is the longest palindromic subsequence in it. “BBBBB” and “BBCBB” are also palindromic subsequences of the given sequence, but not the longest ones.
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

const longestPalindromicSubsequence = (str1) => {
 const str2 = str1.split("").reverse().join(""); // since we need to find the palindromic sequence so, we have the first string
 return longestCommonSubsequence(str1, str2);
}


console.log(`The Longest common palindromic subsequence of BBABCBCAB ${longestPalindromicSubsequence("BBABCBCAB")}`); //BABCBAB

console.log(`The Longest commmon palindromic of geeksforgeeks ${longestPalindromicSubsequence("geeksforgeeks")}`); //eekee, eesee, eefee