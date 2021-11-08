/* 
Minimum number of deletions and insertions to transform one string into another

Given two strings ‘str1’ and ‘str2’ of size m and n respectively. The task is to remove/delete and insert the minimum number of characters from/in str1 to transform it into str2. It could be possible that the same character needs to be removed/deleted from one point of str1 and inserted to some another point.

Input :
str1 = "heap", str2 = "pea"
Output :
Minimum Deletion = 2 and
Minimum Insertion = 1
Explanation:
We find the LCS first(i.e ea)
heap - h - p == ea (2 deletion)
ea + h == pea === s2(pea) (1 insertion)
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


const minInsertionAndDeletion = (text1, text2)=> {
 const lcs = longestCommonSubsequence(text1, text2);
 const numberOfDeletion = text1.length - lcs;
 const numberOfInsertion = text2.length - lcs;

 return [numberOfDeletion, numberOfInsertion];
};

console.log(`The minimim number of deletion and insertion to make "heap" to "pea" are ${minInsertionAndDeletion("heap", "pea")} respectively`);