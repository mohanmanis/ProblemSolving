/* 
Printing Shortest Common Supersequence
Given two strings X and Y, print the shortest string that has both X and Y as subsequences. If multiple shortest supersequence exists, print any one of them.
Input: X = "AGGTAB",  Y = "GXTXAYB"
Output: "AGXGTXAYB" OR "AGGXTXAYB"
OR Any string that represents shortest
supersequence of X and Y

Input: X = "HELLO",  Y = "GEEK"
Output: "GEHEKLLO" OR "GHEEKLLO"
OR Any string that represents shortest
supersequence of X and Y

*/


const printShortestCommonSubsequence = (text1, text2) => {
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
 //for printing shortest common subsequence
 let i = m, j = n;
 while (i > 0 && j > 0) {    // if any of this i and j becomes 0 means one string is empty 
  if (text1[i - 1] == text2[j - 1]) {
   result += text1[i - 1];    //if character matches then add that to result string and move diagonally up
   i--; j--;
  }
  else {
   if (dp[i][j - 1] > dp[i - 1][j]) {
    result += text2[j - 1];
    j--;
   } 
   else {
    result += text1[i - 1];
    i--;
   } 
  }
 }

 while (i > 0) {
  result += text1[i - 1];
  i--;
 }

 while (j > 0) {
  result += text2[j - 1];
  j--;
 }
 return result.split("").reverse().join(""); // reverse the string as we started from last

};


console.log(`The shortest common subsequence of AGGTAB and GXTXAYB is:: ${printShortestCommonSubsequence("AGGTAB", "GXTXAYB")}`); //"AGXGTXAYB" OR "AGGXTXAYB"

console.log(`The Shortest common subsequence of HELLO and GEEK is:: ${printShortestCommonSubsequence("HELLO", "GEEK")}`); //Output: "GEHEKLLO" OR "GHEEKLLO"