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


const longestCommonSubString = (text1, text2) => {
  const m = text1.length;
  const n = text2.length;
  // To store length of the longest
  // common substring
  let result = 0;
  let row = 0, column = 0;
  const dp = [...Array(m + 1)].map(() => Array(n + 1).fill(0));
  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1; // We have a match, increment with the top left.
        //result = Math.max(result, dp[i][j]);// maintain the max around the discontinuity
        if (dp[i][j] > result) {
          result = dp[i][j]; // maintain the max around the discontinuity
          row = i;
          column = j;
        }
      }
      else dp[i][j] = 0; // No match, point of discontinuity reached, reset the length to 0 and start looking 
    }
  }
  if (result.length === 0) {
    // Longest common substring has not been found.
    return '';
  }
  let longestSubstring = '';

  while (dp[row][column] > 0) {
    longestSubstring = text1[row - 1] + longestSubstring;
    row--;
    column--;
  }

  return [longestSubstring, result];

};

let ans = longestCommonSubString("abcdxyz", "xyzabcd");
console.log(`The Longest common Substring of abcdxyz and xyzabcd is ${ans[0]} with length ${ans[1]}`);
ans = longestCommonSubString("zxabcdezy", "yzabcdezx");
console.log(`The Longest common Substring of zxabcdezy and yzabcdezx is ${ans[0]} with length ${ans[1]}`)


var findMaximizedCapital = function (k, w, profits, capital) {
  let maxheap = new MaxPriorityQueue({ priority: v => v[0] });
  let minheap = new MinPriorityQueue({ priority: v => v[1] });
  for (let i = 0; i < profits.length; i++) {                  //step 1
    maxheap.enqueue([profits[i], capital[i]]);
  }
  while (k && maxheap.size()) {
    let [value, limit] = maxheap.dequeue().element;        //step 2
    if (limit <= w) k--, w += value;
    else minheap.enqueue([value, limit]);
    while (minheap.size() && minheap.front().priority <= w) { //step 3
      let [value, limit] = minheap.dequeue().element;
      maxheap.enqueue([value, limit]);
    }
  }
  return w;
};




