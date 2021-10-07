/* 
Given two strings ‘X’ and ‘Y’, find the length of the longest common substring.
Input : X = “GeeksforGeeks”, y = “GeeksQuiz”
Output : 5
Explanation:
The longest common substring is “Geeks” and is of length 5.

Input : X = “abcdxyz”, y = “xyzabcd”
Output : 4
Explanation:
The longest common substring is “abcd” and is of length 4.

Input : X = “zxabcdezy”, y = “yzabcdezx”
Output : 6
Explanation:
The longest common substring is “abcdez” and is of length 6.

*/


const longestCommonString = (text1, text2) => {
 const m = text1.length;
 const n = text2.length;
 // To store length of the longest
 // common substring
 let result = 0;
 const dp = [...Array(m + 1)].map(() => Array(n + 1).fill(0));
 for (let i = 1; i < m + 1; i++) {
  for (let j = 1; j < n + 1; j++) {
   if (text1[i - 1] === text2[j - 1]){
    dp[i][j] = dp[i - 1][j - 1] + 1; // We have a match, increment with the top left.
    result = Math.max(result, dp[i][j]); // maintain the max around the discontinuity
   } 
   else dp[i][j] = 0; // No match, point of discontinuity reached, reset the length to 0 and start looking 
  }
 }
 return result; 

};


console.log(`The Longest common Substring of abcdxyz and xyzabcd ${longestCommonString("abcdxyz", "xyzabcd")}`);

console.log(`The Longest common Substring of zxabcdezy and yzabcdezx ${longestCommonString("zxabcdezy", "yzabcdezx")}`)