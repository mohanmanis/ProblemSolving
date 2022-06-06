/**
 * Longest Substring with At Most K Distinct Characters
 * Given a string s and an integer k, return the length of the longest substring * of s that contains at most k distinct characters.
 * Input: s = "eceba", k = 2
 * Output: 3
 * Explanation: The substring is "ece" with length 3.
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function (s, k) {
 let windowStart = 0, windowEnd = 0, charMap = new Map();
 let maxLength = Number.MIN_VALUE;
 let len = s.length;
 while (windowEnd < len) {
  const char = s[windowEnd];
  charMap.set(char, (charMap.get(char) || 0) + 1)
  while (charMap.size > k) {
   const leftChar = s[windowStart];
   charMap.set(leftChar, (charMap.get(leftChar)) - 1);
   if (charMap.get(leftChar) === 0) {
    charMap.delete(leftChar);
   }
   windowStart++;
  }
  maxLength = Math.max(maxLength, windowEnd - windowStart + 1); //windowEnd - windowStart + 1 gives current window size
  windowEnd++;
 }
 return maxLength;
};


const s = "eceba"
const k = 2;
console.log(`Longest Substring with At Most ${k} Distinct Characters in string ${s} is : ${lengthOfLongestSubstringKDistinct(s, k)}`);

