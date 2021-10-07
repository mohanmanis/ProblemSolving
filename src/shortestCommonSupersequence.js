/* 
Given two strings str1 and str2, the task is to find the length of the shortest string that has both str1 and str2 as subsequences.
Input:   str1 = "geek",  str2 = "eke"
Output: 5
Explanation:
String "geeke" has both string "geek"
and "eke" as subsequences.

Input:   str1 = "AGGTAB",  str2 = "GXTXAYB"
Output:  9
Explanation:
String "AGXGTXAYB" has both string
"AGGTAB" and "GXTXAYB" as subsequences.
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

const shortestCommonSuperSequence = (text1, text2) => {
 const m = text1.length;
 const n = text2.length;

 return m + n - longestCommonSubsequence(text1, text2);
}


console.log(`The shortest common superSequence of AGGTAB and GXTXAYB ${shortestCommonSuperSequence("AGGTAB", "GXTXAYB")}`);