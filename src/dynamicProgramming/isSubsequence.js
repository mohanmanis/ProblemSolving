/* 
Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

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

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isSubsequence = function (s, t) {
 let i = 0, j = 0;
 while (j < t.length && i < s.length) {
  if (s[i] === t[j]) {
   i++;
  }
  j++;
 }
 return i === s.length;
};

//using LCS
const isSubsequence2 = function (s, t) {
 return s.length === longestCommonSubsequence(s,t);
};


console.log(`Is abc a subsequence of "abc"
"ahbgdc": ${isSubsequence("abc", "ahbgdc")}`); // true

console.log(`Is abc a subsequence of "axc"
"ahbgdc": ${isSubsequence("axc", "ahbgdc")}`); // false


console.log(`Is abc a subsequence of "abc"
"ahbgdc": ${isSubsequence2("abc", "ahbgdc")}`); // true

console.log(`Is abc a subsequence of "axc"
"ahbgdc": ${isSubsequence2("axc", "ahbgdc")}`); // false